import $ from 'jquery'
;((pluginId): void => {
  const $form = $('.js-submit-settings')
  const $cancelButton = $('.js-cancel-button')
  const $message = $('.js-text-message')
  const config = kintone.plugin.app.getConfig(pluginId)

  if (config.message) {
    $message.val(config.message)
  }
  $form.on('submit', e => {
    e.preventDefault()
    kintone.plugin.app.setConfig({ message: $message.val() }, () => {
      alert('The plug-in settings have been saved. Please update the app!')
      window.location.href = '/k/admin/app/flow?app=' + kintone.app.getId()
    })
  })
  $cancelButton.on('click', () => {
    window.location.href = '/k/admin/app/' + kintone.app.getId() + '/plugin/'
  })
})(kintone.$PLUGIN_ID)
