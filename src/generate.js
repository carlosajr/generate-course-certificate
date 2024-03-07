const PDFDocument = require("pdfkit");
const fs = require("fs");

function createPDF(name) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", layout: "landscape" });
    const writeStream = fs.createWriteStream(`assets/output/${name}.pdf`);
    doc.pipe(writeStream);

    doc.image(`assets/bg.png`, 0, 0, { fit: [841.89, 595.28] });

    doc.font(`assets/exmouth_.ttf`).fontSize(40).text(name, -102, 255, {
      align: `center`,
      width: 1055,
    });

    doc.end();

    writeStream.on("finish", () => {
      resolve(console.log(`Certificado gerado para ${name}`));
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}

module.exports = {
  createPDF,
};
