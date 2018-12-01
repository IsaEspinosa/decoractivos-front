/**
 * Created by garusis on 22/09/18.
 */

function extract(filesForItem, environment, layer, itemName, prefix) {
  const lowerItemName = `${prefix}${itemName}`.toLowerCase()
  const item = {name: itemName}
  if (filesForItem[0].toLowerCase().includes(lowerItemName)) {
    item.image_simulator = filesForItem[0]
    item.preview = filesForItem[1]
  } else {
    item.image_simulator = filesForItem[1]
    item.preview = filesForItem[0]
  }
  return item
}

exports.paredes_base = function (filesForItem, environment, layer, itemName) {
  return extract(filesForItem, environment, layer, itemName, 'PARED ');
}

exports.piso = function (filesForItem, environment, layer, itemName) {
  return extract(filesForItem, environment, layer, itemName, 'PISO ');
}

exports.decorados = function (filesForItem, environment, layer, itemName) {
  return extract(filesForItem, environment, layer, itemName, 'DECORADO ');
}
