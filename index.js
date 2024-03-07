const path = require("path");

const { createPDF } = require("./src/generate");
const { readCSV } = require("./src/csv");
const { capitalizeName } = require("./src/utils");

const csvFilePath = path.join(__dirname, "assets", "enrolleds.csv");

(async () => {
  const enrroleds = await readCSV(csvFilePath);

  for (const enrroled of enrroleds) {
    const name = capitalizeName(enrroled.name);

    await createPDF(name);
  }
})();
