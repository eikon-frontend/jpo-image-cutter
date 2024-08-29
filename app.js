import fs from "fs";

fs.readdir("images", (err, files) => {
  if (err) {
    console.error("Impossible de lire le dossier images");
    return;
  }

  files.forEach((file) => {
    console.log(file);
  });
});
