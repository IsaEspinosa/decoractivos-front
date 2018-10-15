/**
 * Created by garusis on 19/09/18.
 */
const {readdirSync, writeFileSync, copyFile} = require('fs')
const {join, extname} = require('path')
const {chain, omit} = require('lodash')
const imagemin = require('imagemin-keep-folder')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const Jimp = require('jimp')

const extractItemData = require('./extract-item-data')

const imagesPath = './.original_images/Ambientes'
const assetsPath = 'src/assets/images'

const enviromentTypes = {
  'Baño 1': 4,
  'Comedor 1': 2,
  'Cocina 1': 3,
  'Exterior 1': 5,
  'Local 1': 6,
  'Sala 1': 1
}

function debug (obj) {
  console.log(JSON.stringify(obj, null, 2))
}

const environmentTypesArray = [
  {
    environment_type_id: 1,
    name: 'Salas'
  },
  {
    environment_type_id: 2,
    name: 'Comedores'
  },
  {
    environment_type_id: 3,
    name: 'Cocinas'
  },
  {
    environment_type_id: 4,
    name: 'Baños'
  },
  {
    environment_type_id: 5,
    name: 'Exteriores'
  },
  {
    environment_type_id: 6,
    name: 'Locales'
  }
]
const environments = []
const layers = []
const categories = []
const items = []

function isNotCustomisableLayer (layerDir) {
  const level1 = readdirSync(layerDir, {withFileTypes: true})
  return level1.length === 1 && level1[0].isFile()
}

function hasCategories (layerDir) {
  const level1 = readdirSync(layerDir)
  const level2 = readdirSync(join(layerDir, level1[0]), {withFileTypes: true})
  return level2[0].isDirectory()
}

function extractItems (itemContainerPath, environment, layer, category = {category_id: null}) {
  readdirSync(itemContainerPath)
    .forEach(function (itemName) {
      const itemData = extractItemData(environment, layer, itemName, join(itemContainerPath, itemName))
      const item = {
        item_id: items.length + 1,
        layer_id: layer.layer_id,
        category_id: category.category_id,
        name: itemData.name
      }

      if (itemData.preview) {
        item.preview = `assets/images/simulator/previews/${item.item_id}-pw${extname(itemData.preview)}`
        item.original_preview = join(itemContainerPath, itemName, itemData.preview)
      } else {
        console.error('This item don\'t have preview', itemContainerPath, itemName)
      }

      if (itemData.image_simulator) {
        item.image_simulator = `assets/images/simulator/layer/${item.item_id}${extname(itemData.image_simulator)}`
        item.original_image_simulator = join(itemContainerPath, itemName, itemData.image_simulator)
      } else {
        console.error('This item don\'t have image_simulator', itemContainerPath)
      }
      items.push(item)
    })
}

function extractCategories (categoriesContainerPath, environment, layer) {
  readdirSync(categoriesContainerPath)
    .forEach(function (categoryDir) {
      const categoryName = chain(categoryDir).lowerCase().startCase()
      const category = {
        category_id: categories.length + 1,
        layer_id: layer.layer_id,
        name: categoryName
      }
      categories.push(category)

      extractItems(join(categoriesContainerPath, categoryDir), environment, layer, category)
    })
}

function generateData () {
  readdirSync(imagesPath)
    .forEach(function (environmentName, index) {
      const environment_id = index + 1
      const environmentDir = join(imagesPath, environmentName)
      const environmentContent = readdirSync(environmentDir, {withFileTypes: true})

      const environmentPreview = environmentContent.find(environment => environment.isFile())
      const layerDirectories = environmentContent.filter(environment => environment.isDirectory())

      const slug = chain(`${environmentName} ${environment_id}`)
        .deburr()
        .kebabCase()
        .value()

      const environment = {
        environment_id,
        environment_type_id: enviromentTypes[environmentName],
        base_image: '',
        preview: `assets/images/environments/${slug}${extname(environmentPreview.name)}`,
        original_preview: join(environmentDir, environmentPreview.name),
        name: environmentName,
        slug
      }
      environments.push(environment)

      layerDirectories.forEach(layerDirectoryName => {
        const layerIndex = layerDirectoryName.name.replace(/^(\d+).*$/, '$1')
        const layerName = layerDirectoryName.name.replace(/^\d+ (.*)$/, '$1')
        const layerDir = join(environmentDir, layerDirectoryName.name)
        const layer = {
          environment_id,
          layer_id: layers.length + 1,
          layer_index: parseInt(layerIndex),
          name: layerName,
          default_item: null,
          customizable: false,
          categories: []
        }

        layers.push(layer)

        if (isNotCustomisableLayer(layerDir)) {
          const fileName = readdirSync(layerDir)[0]
          const item = {
            item_id: items.length + 1,
            layer_id: layer.layer_id,
            category_id: null,
            name: layer.name,
            preview: null
          }

          item.image_simulator = `assets/images/simulator/layer/${item.item_id}${extname(fileName)}`
          item.original_image_simulator = join(layerDir, fileName)
          layer.default_item = item.item_id
          return items.push(item)
        }

        layer.customizable = true

        if (hasCategories(layerDir)) {
          extractCategories(layerDir, environment, layer)
        } else {
          extractItems(layerDir, environment, layer)
        }
      })
    })
}

function reorderData () {
  layers.forEach(function (layer) {
    layer.categories = categories.filter(category => category.layer_id === layer.layer_id)
    layer.items = items.filter(item => item.layer_id === layer.layer_id)
    if (layer.categories.length) {
      layer.default_item = layer.items.find(item => item.category_id === layer.categories[0].category_id).item_id
    } else {
      layer.default_item = layer.items[0].item_id
    }
  })
}

async function resizeImages () {
  const environmentPath = `${assetsPath}/environments`
  const previewPath = `${assetsPath}/simulator/previews`
  const layerPath = `${assetsPath}/simulator/layer`
  await Promise.all(
    readdirSync(previewPath)
      .map(imageName => Jimp.read(`${previewPath}/${imageName}`)
        .then(image => image.resize(200, Jimp.AUTO).write(`${previewPath}/${imageName}`))
        .catch(err => console.error(`Error resizing: ${previewPath}/${imageName}`))))
  await Promise.all(
    readdirSync(layerPath)
      .map(imageName => Jimp.read(`${layerPath}/${imageName}`)
        .then(image => image.resize(1300, Jimp.AUTO).write(`${layerPath}/${imageName}`))
        .catch(err => console.error(`Error resizing: ${layerPath}/${imageName}`))))
  await Promise.all(
    readdirSync(environmentPath)
      .map(imageName => Jimp.read(`${environmentPath}/${imageName}`)
        .then(image => image.resize(Jimp.AUTO, 500).write(`${environmentPath}/${imageName}`))
        .catch(err => console.error(`Error resizing: ${environmentPath}/${imageName}`))))
}

function migrateImage (src, dst) {
  return new Promise((resolve, reject) => copyFile(src, join('src', dst), err => err ? reject(err) : resolve()))
}

function migrateImages () {
  const environmentsPromises = environments.map(environment => {
    const src = environment.original_preview
    delete environment.original_preview
    return migrateImage(src, environment.preview)
  })
  const previewPromises = items.filter(item => !!item.preview).map(item => {
    const src = item.original_preview
    delete item.original_preview
    return migrateImage(src, item.preview)
  })
  const layersPromises = items.filter(item => !!item.image_simulator).map(item => {
    const src = item.original_image_simulator
    delete item.original_image_simulator
    return migrateImage(src, item.image_simulator)
  })

  return Promise.all([
    Promise.all(environmentsPromises),
    Promise.all(previewPromises),
    Promise.all(layersPromises)
  ])
}

(async () => {
  generateData()
  reorderData()
  await migrateImages()
  await resizeImages()
  if (process.argv[2] === '--compress') {
    await imagemin([`${assetsPath}/**/*.{jpg,png}`], {
      plugins: [
        imageminJpegtran(),
        imageminPngquant()
      ]
    })
  }
  writeFileSync('src/app/common/mocks/environments.ts', `export const environmentList: Array<any> = ${JSON.stringify(environments, null, 2)};`)
  writeFileSync('src/app/common/mocks/layers.ts', `export const layerList: Array<any> = ${JSON.stringify(layers, null, 2)};`)
  writeFileSync('src/app/common/mocks/environment_types.ts', `export const environmentTypeList: Array<any> = ${JSON.stringify(environmentTypesArray, null, 2)};`)

  writeFileSync('.migrator_sources/environments.json', JSON.stringify(environments.map(environment => omit(environment, ['slug'])), null, 2))
  writeFileSync('.migrator_sources/environment_types.json', JSON.stringify(environmentTypesArray, null, 2))
  writeFileSync('.migrator_sources/layers.json', JSON.stringify(layers.map(layer => omit(layer, ['categories', 'items'])), null, 2))
  writeFileSync('.migrator_sources/item_categories.json', JSON.stringify(categories, null, 2))
  writeFileSync('.migrator_sources/layer_items.json', JSON.stringify(items, null, 2))
})()
