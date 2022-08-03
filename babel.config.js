module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        jsx: {
          compositionAPI: true
        }
      }
    ]
  ],
  'env': {
    'development': {
      'plugins': ['dynamic-import-node']
    }
  }
}
