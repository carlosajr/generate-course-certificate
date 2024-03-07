const fs = require("fs");
const csvParser = require("csv-parser");

const readCSV = async (filePath) => {
  const results = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(
        csvParser({
          mapHeaders: ({ header, index }) => header.trim(),
          mapValues: ({ header, index, value }) => value.trim(),
        })
      )
      .on("data", (data) => results.push(data))
      .on("end", () => {
        resolve(results);
      })
      .on("error", reject);
  });
};

module.exports = { readCSV };
