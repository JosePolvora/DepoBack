const fs = require("fs");
const XLSX = require("xlsx");
const dbdepo = require("../models/index.models");

exports.uploadUbicaciones = async (req, res) => {
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

    // Mapear datos de Excel a objeto para la tabla Ubicacion
    const formattedData = jsonData.map((row) => ({
      codigo: row["CODIGO"],
      calle: row["CALLE"],
      estanteria: row["ESTANTERIA"],
      nivel: row["NIVEL"]
    }));

    const result = [];

    for (const obj of formattedData) {
      const { codigo } = obj;
      if (!codigo) continue;

      // Busco si ya existe una ubicación con ese código
      const existente = await dbdepo.Ubicacion.findOne({ where: { codigo } });

      if (existente) {
        // Actualizo si existe
        await dbdepo.Ubicacion.update(obj, { where: { codigo } });
        result.push({ codigo, status: "actualizado" });
      } else {
        // Creo si no existe
        await dbdepo.Ubicacion.create(obj);
        result.push({ codigo, status: "creado" });
      }
    }

    fs.unlinkSync(tempFilePath);

    res.status(200).json({
      message: "Archivo de ubicaciones procesado correctamente",
      result,
    });

  } catch (error) {
    console.error("Error al procesar el archivo de ubicaciones:", error);
    res.status(500).json({ message: "Error al procesar el archivo", error });
  }
};
