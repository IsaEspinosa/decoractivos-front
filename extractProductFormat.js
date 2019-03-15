const fs = require("fs");

let items = require("./.migrator_sources/layer_items");

function extract(item) {
  const {name} = item;
  const Formato = name.replace(/^\D*(\d+)x(\d+)\D*$/i, "$1X$2");
  if (/^\d+X\d+$/.test(Formato)) {
    item.additional_info = {Formato}
  }
  return item;
}

items = items.map(extract);
fs.writeFileSync(`./.migrator_sources/layer_items.json`, JSON.stringify(items, null, 2));
