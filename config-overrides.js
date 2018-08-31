const { compose, injectBabelPlugin } = require('react-app-rewired')
const { createEmotionRewire } = require('react-app-rewire-emotion')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        alias: {
          '@pages': './src/pages'
        }
      }
    ],
    config
  )

  const rewires = compose(createEmotionRewire({ inline: true }))
  return rewires(config, env)
}
