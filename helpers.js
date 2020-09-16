const fs = require("fs");
const fsPromises = fs.promises;

function getFiles(folderName) {
  return fsPromises.readdir(folderName, {}, (err, files) => {
    if (err) return err;
    return files;
  });
}

module.exports = {
  getFiles,
};
