# Installation

1. Ouvrir le terminal et aller dans le dossier souhaité. Par exemple :

```bash
cd Documents
```

2. Cloner le repository git :

```bash
git clone https://github.com/eikon-frontend/jpo-image-cutter.git
```

3. Ouvrir le dossier _jpo-image-cutter_ avec Visual Studio Code, ouvrir un terminal dans Visual Studio Code, puis entrer la commande :

```bash
npm install
```

# Utilisation

1. Déposer des images dans le dossier _images_ (le nom des fichiers n'a pas d'importance)
2. Depuis le terminal de Visual Studio Code, lancer la commande :

```bash
npm run start
```

3. Les extraits d'images générés sont enregistrés dans le dossier _extracts_

# Configuration

La configuration peut être adaptée en modifiant les constantes suivantes dans _app.js_ :

```js
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
```
