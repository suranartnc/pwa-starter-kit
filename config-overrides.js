const { compose, injectBabelPlugin } = require('react-app-rewired')
const { createEmotionRewire } = require('react-app-rewire-emotion')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        alias: {
          '@routes': './src/routes',
          '@pages': './src/pages',
          '@common': './src/common'
        }
      }
    ],
    config
  )

  const rewires = compose(createEmotionRewire({ inline: true }))
  return rewires(config, env)
}
