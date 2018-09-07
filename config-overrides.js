const { injectBabelPlugin } = require('react-app-rewired')
const rewireStyledComponents = require('react-app-rewire-styled-components')
const rewireImport = require('react-app-rewire-import')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    [
      'module-resolver',
      {
        alias: {
          '@routes': './src/routes',
          '@pages': './src/pages',
          '@common': './src/common',
          '@hocs': './src/hocs',
          '@redux': './src/redux',
          '@utils': './src/utils'
        }
      }
    ],
    config
  )

  config = rewireImport(config, env, {
    libraryName: 'antd',
    style: 'css'
  })

  config = rewireStyledComponents(config, env)

  return config
}
