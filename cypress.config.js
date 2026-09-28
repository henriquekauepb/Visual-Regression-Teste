const { defineConfig } = require('cypress')
const getCompareSnapshotsPlugin = require('cypress-image-diff-js/plugin')

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://portal2026.telebras.com.br/',
   
    setupNodeEvents(on, config) {
      return getCompareSnapshotsPlugin(on, config)
    }

  }

})