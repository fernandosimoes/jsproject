const fs = require('fs')

function getJsFiles() {
  let objPath = {};

  fs.readdirSync('./src/js/').forEach(file => {
    const index = file.split('.js').shift();
    objPath[index] = `./${file}`;
  })

  return objPath;
}

module.exports = getJsFiles();
