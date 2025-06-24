const fs = require("fs");
const XLSX = require("xlsx");
const dbdepo = require("../models/index.models");

exports.uploadFile = async (req, res) => {
  try {
    const file = req.files?.file;

    if (!file) {
      return res.status(400).json({ message: "No se subió ningún archivo" });
    }

    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    
    const tempFilePath = `./uploads/${file.name}`;

    fs.writeFileSync(tempFilePath, file.data);

    const workbook = XLSX.readFile(tempFilePath);
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const formattedData = jsonData.map((row) => ({
      plano: row["PLANO"],
      denominacion: row["DENOMINACION"],
      origen: row["ORIGEN"],
      //stock_total: row["STOCK"]
    }));

    const result = [];

    for (const obj of formattedData) {
      const { plano } = obj;
      if (!plano) continue;

      const existente = await dbdepo.Plano.findOne({ where: { plano } });

      if (existente) {
        await dbdepo.Plano.update(obj, { where: { plano } });
        result.push({ plano, status: "actualizado" });
      } else {
        await dbdepo.Plano.create(obj);
        result.push({ plano, status: "creado" });
      }
    }

    fs.unlinkSync(tempFilePath);

    res.status(200).json({
      message: "Archivo procesado correctamente",
      result,
    });

  } catch (error) {
    console.error("Error al procesar el archivo:", error);
    res.status(500).json({ message: "Error al procesar el archivo", error });
  }
};
