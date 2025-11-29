const [server, client] = require('nullstack/webpack.config')
const path = require('path')

function customServer(...args) {
  const config = server(...args)

  // Configurar alias para @
  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {}
  }
  config.resolve.alias['@'] = path.resolve(__dirname, 'src')

  return config
}

function customClient(...args) {
  const config = client(...args)
  const rule = config.module.rules.find(
    (rule) => rule.test && rule.test.test('.css'),
  )
  rule.use.push({
    loader: require.resolve('postcss-loader'),
    options: {
      postcssOptions: {
        plugins: {
          '@tailwindcss/postcss': {},
        },
      },
    },
  })

  // Configurar alias para @
  if (!config.resolve) {
    config.resolve = {}
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {}
  }
  config.resolve.alias['@'] = path.resolve(__dirname, 'src')

  // Configurar minimizer CSS mais compatível para build
  if (config.optimization && config.optimization.minimizer) {
    config.optimization.minimizer = config.optimization.minimizer.map(
      (minimizer) => {
        if (minimizer.constructor.name === 'CssMinimizerPlugin') {
          const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
          return new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                'default',
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          })
        }
        return minimizer
      },
    )
  }

  return config
}

module.exports = [customServer, customClient]
