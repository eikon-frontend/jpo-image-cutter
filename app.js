import sharp from "sharp";
import { readdir } from "fs/promises";

// Formats acceptés
const formats = ["jpg", "jpeg", "png", "gif"];

// Fonction d'extraction d'une partie de l'image
const extract = async (file) => {
  const input = await sharp(`images/${file}`).toBuffer();
  const image = sharp(input);
  const metadata = await image.metadata();
  const { width, height } = metadata;

  const left = parseInt(Math.random() * (width - 50));
  const top = parseInt(Math.random() * (height - 50));

  await image
    .extract({ left, top, width: 50, height: 50 })
    .toFile(`extracts/${file}`);
};

const files = await readdir("images");

// On filtre la liste des fichiers pour ne garder que les formats acceptés
const filteredFiles = files.filter((file) => {
  const extension = file.split(".").pop();
  return formats.includes(extension);
});

for await (const file of filteredFiles) {
  await extract(file);
}
