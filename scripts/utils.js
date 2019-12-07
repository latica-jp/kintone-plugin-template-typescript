const chokidar = require('chokidar')

exports.waitForFileCreateOrUpdate = async path => {
  return new Promise((resolve, reject) => {
    const watcher = chokidar.watch(path)
    console.info(`Watching ${path}...`)
    const timeoutId = setTimeout(() => {
      watcher.close()
      reject('Plugin zip file not created.')
    }, 30000)
    const success = message => {
      watcher.close()
      clearTimeout(timeoutId)
      resolve(message)
    }
    watcher.on('add', () => success('created'))
    watcher.on('change', () => success('modified'))
  })
}
