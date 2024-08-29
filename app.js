import fs from "fs";
import sharp from "sharp";

// Formats acceptés
const formats = ["jpg", "jpeg", "png", "gif"];

// Fonction d'extraction d'une partie de l'image
const extract = async (file) => {
  const input = await sharp(`images/${file}`).toBuffer();

  await sharp(input)
    .extract({
      left: 0,
      top: 0,
      width: 50,
      height: 50,
    })
    .toFile(`extracts/${file}`);
};

fs.readdir("images", (err, files) => {
  if (err) {
    console.error("Impossible de lire le dossier images");
    return;
  }

  // On filtre la liste des fichiers pour ne garder que les formats acceptés
  files = files.filter((file) => {
    const extension = file.split(".").pop();
    return formats.includes(extension);
  });

  files.forEach((file) => {
    extract(file);
  });
});
