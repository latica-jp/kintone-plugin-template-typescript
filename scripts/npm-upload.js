;(async () => {
  const { existsSync } = require('fs')
  const npmRun = require('npm-run')

  const { pluginZipFilePath } = require('../webpack-utils')
  const { waitForFileCreateOrUpdate } = require('./utils')

  const args = process.argv.slice(2)
  const isWatchMode = args.includes('--watch')
  const zipFileExists = () => existsSync(pluginZipFilePath)

  if (!isWatchMode) {
    if (!zipFileExists()) {
      console.error(`Missing zip file '${pluginZipFilePath}'.`)
      return
    }
  } else {
    try {
      const result = await waitForFileCreateOrUpdate(pluginZipFilePath)
      console.info(`Zip file '${pluginZipFilePath}' ${result}!`)
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }

  const env = require('dotenv').config().parsed
  const uploadArgs = [
    pluginZipFilePath,
    `--domain ${env.KINTONE_DOMAIN}`,
    `--username ${env.KINTONE_USERNAME}`,
    `--password ${env.KINTONE_PASSWORD}`,
    '--waiting-dialog-ms 5000',
    ...args,
  ]
  const ps = npmRun.exec(`kintone-plugin-uploader ${uploadArgs.join(' ')}`)
  ps.stdout.pipe(process.stdout)
  // start で並列起動されている webpack が異常終了
  // -> このプロセスも終了される https://github.com/mysticatea/npm-run-all/blob/master/docs/npm-run-all.md#run-scripts-in-parallel
  // -> kintone-plugin-uploader も終了させる
  process.on('exit', () => ps.kill())
})()
