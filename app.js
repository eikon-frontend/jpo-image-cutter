import sharp from "sharp";
import { readdir } from "fs/promises";

// Formats acceptés
const formats = ["jpg", "jpeg", "png", "gif"];
// Largeur minimum de l'extrait
const minWidth = 50;
// Largeur maximum de l'extrait
const maxWidth = 300;
// Hauteur minimum de l'extrait
const minHeight = 50;
// Hauteur maximum de l'extrait
const maxHeight = 300;
// Nombre d'extraits par image
const extractsPerImage = 5;

// Fonction d'extraction d'une partie de l'image
const extract = async (file) => {
  const input = await sharp(`images/${file}`).toBuffer();
  const image = sharp(input);
  const metadata = await image.metadata();

  // Si l'image est plus petite que maxWidth et maxHeight, on ne l'extrait pas
  if (metadata.width < maxWidth || metadata.height < maxHeight) {
    return;
  }

  // On définit une largeur aléatoire entre minWidth et maxWidth
  const width = parseInt(Math.random() * (maxWidth - minWidth) + minWidth);
  // On définit une hauteur aléatoire entre minHeight et maxHeight
  const height = parseInt(Math.random() * (maxHeight - minHeight) + minHeight);
  // On définit un point de départ aléatoire en x
  const left = parseInt(Math.random() * (metadata.width - width));
  // On définit un point de départ aléatoire en y
  const top = parseInt(Math.random() * (metadata.height - height));

  // On compte le nombre de fichiers dans le dossier extracts pour définir le nom du fichier
  const extractFiles = await readdir("extracts");
  const extension = file.split(".").pop();
  const fileName = extractFiles.length + 1 + "." + extension;

  // On extrait la partie de l'image et on l'enregistre dans le dossier extracts
  await image
    .extract({ left, top, width, height })
    .toFile(`extracts/${fileName}`);
};

// On récupère la liste des fichiers dans le dossier images
const files = await readdir("images");

// On filtre la liste des fichiers pour ne garder que les formats acceptés
const filteredFiles = files.filter((file) => {
  const extension = file.split(".").pop();
  return formats.includes(extension);
});

for await (const file of filteredFiles) {
  // On extrait lance la fonction extract autant de fois que défini dans extractsPerImage
  for (let i = 0; i < extractsPerImage; i++) {
    await extract(file);
  }
}
