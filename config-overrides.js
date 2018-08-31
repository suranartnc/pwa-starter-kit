const { compose, injectBabelPlugin } = require('react-app-rewired')
const { createEmotionRewire } = require('react-app-rewire-emotion')
const rewireImport = require('react-app-rewire-import')

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

  config = rewireImport(config, env, {
    libraryName: 'antd',
    style: 'css'
  })

  const rewires = compose(createEmotionRewire({ inline: true }))

  return rewires(config, env)
}
