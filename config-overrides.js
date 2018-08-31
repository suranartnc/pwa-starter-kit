const { compose } = require('react-app-rewired')
const { createEmotionRewire } = require('react-app-rewire-emotion')

module.exports = function override(config, env) {
  const rewires = compose(createEmotionRewire({ inline: true }))
  return rewires(config, env)
}
