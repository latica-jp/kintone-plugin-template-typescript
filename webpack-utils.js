const createPluginZipFileName = () => {
  const config = require('./src/manifest.json')
  const desc = config.name.en
    .toLowerCase()
    .replace(/(\s|_)/g, '-')
    .replace(/[^a-z0-9-]+/g, '')
  return `${desc}-${config.version}.zip`
}

const pluginZipFileName = createPluginZipFileName()

module.exports = {
  pluginZipFilePath: `./dist/${pluginZipFileName}`,
}
