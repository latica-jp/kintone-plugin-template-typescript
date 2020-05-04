;((pluginId): void => {
  const form = document.querySelector('.js-submit-settings') as HTMLFormElement
  const cancelButton = document.querySelector('.js-cancel-button') as HTMLButtonElement
  const message = document.querySelector('.js-text-message') as HTMLInputElement

  const config = kintone.plugin.app.getConfig(pluginId)
  if (config.message) {
    ;(message as HTMLInputElement).value = config.message
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    kintone.plugin.app.setConfig({ message: message.value }, () => {
      alert('The plug-in settings have been saved. Please update the app!')
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId()
    })
  })
  cancelButton.onclick = () => {
    window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/'
  }
})(kintone.$PLUGIN_ID)
