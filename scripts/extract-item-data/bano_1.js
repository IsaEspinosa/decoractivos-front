/**
 * Created by garusis on 22/09/18.
 */

function extract (filesForItem, environment, layer, itemName) {
  const item = {name: itemName}
  if (filesForItem[0].toLowerCase().includes(itemName)) {
    item.image_simulator = filesForItem[0]
    item.preview = filesForItem[1]
  } else {
    item.image_simulator = filesForItem[1]
    item.preview = filesForItem[0]
  }
  return item
}

exports.paredes_base = extract

exports.piso = extract

exports.decorados = extract
