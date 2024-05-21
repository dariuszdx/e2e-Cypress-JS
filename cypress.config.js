const { defineConfig } = require('cypress');

// Define the main Cypress config object
const config = defineConfig(Object.assign(
  {
    reporterEnabled: 'spec, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/results/results-[hash].xml',
    },
  },
  {
    includeShadowDom: true,
    chromeWebSecurity: true,
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    theme: 'dark',
    reporter: 'cypress-multi-reporters',
    email: 'dariusz.dulemba@gmail.com',
  },
  {
    
    e2e: {
      baseUrl: 'https://magento.softwaretestingboard.com/', 
      setupNodeEvents(on, config) { },
      supportFile: false,
    },
  },

  {
    env: {
      file: 'cypress.env.json',
    },
  }
));

module.exports = config;
