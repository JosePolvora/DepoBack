const fs = require("fs");
const path = require("path");

const uploadsFolder = path.join(__dirname, "uploads");

fs.readdir(uploadsFolder, (err, files) => {
  if (err) {
    console.error("❌ Error leyendo la carpeta 'uploads':", err);
    return;
  }

  if (files.length === 0) {
    console.log("✅ La carpeta 'uploads' ya está vacía.");
    return;
  }

  for (const file of files) {
    const filePath = path.join(uploadsFolder, file);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`❌ Error al eliminar ${file}:`, err);
      } else {
        console.log(`🗑️ Archivo eliminado: ${file}`);
      }
    });
  }
});
