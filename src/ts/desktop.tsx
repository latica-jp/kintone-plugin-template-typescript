;((pluginId: string): void => {
  kintone.events.on('app.record.index.show', (event) => {
    const config = kintone.plugin.app.getConfig(pluginId)

    const spaceElement = kintone.app.getHeaderSpaceElement()
    if (!spaceElement) return event
    const fragment = document.createDocumentFragment()
    const headingEl = document.createElement('h3')
    const messageEl = document.createElement('p')

    messageEl.classList.add('plugin-space-message')
    messageEl.textContent = config.message
    headingEl.classList.add('plugin-space-heading')
    headingEl.textContent = 'Hello kintone plugin!'

    fragment.appendChild(headingEl)
    fragment.appendChild(messageEl)
    spaceElement.appendChild(fragment)
    return event
  })
})(kintone.$PLUGIN_ID)
