/**
 * Created by garusis on 22/09/18.
 */
const {readdirSync} = require('fs')
const {snakeCase} = require('lodash')

function extractItemImages (environment, layer, itemName, directoryPath) {
  const filesForItem = readdirSync(directoryPath)

  const layerProcessor = require(`./${snakeCase(environment.name)}`)[snakeCase(layer.name)]
  return {
    ...layerProcessor(filesForItem, environment, layer, itemName.toLowerCase()),
    name: itemName || layer.name
  }
}

module.exports = extractItemImages
