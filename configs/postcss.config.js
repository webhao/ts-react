module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-flexbugs-fixes': {},
    'cssnano': {
      preset: ['default', {
        discardComments: { removeAll: true },
      }],
    },
  },
}
