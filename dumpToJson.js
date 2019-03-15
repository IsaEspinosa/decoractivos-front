const fs = require("fs");
const dump = require("./dump");

dump.forEach(item => {
  if (item.type !== "table") return;
  fs.writeFileSync(`./.migrator_sources/${item.name}.json`, JSON.stringify(item.data, null, 2));
});
