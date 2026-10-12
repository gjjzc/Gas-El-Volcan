module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],

    files: [
      'src/**/*.spec.jsx'
    ],

    preprocessors: {
      'src/**/*.spec.jsx': ['webpack']
    },

    webpack: {
      mode: 'development',

      module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      },

      resolve: {
        extensions: ['.js', '.jsx']
      }
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      dir: 'coverage',
      reporters: [
        {
          type: 'html',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    },

    browsers: ['ChromeHeadless'],

    singleRun: true
  })
}
