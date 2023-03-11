const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Content-test-report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false
  },
  e2e: {     
    taskTimeout: 3000,
    specPattern: "cypress/e2e/**/*.{ts,tsx}",
    env: {
      HomageURL: "https://apply.homage.sg/"
    },
     retries: {
      runMode: 1,
      openMode: 1,
    },
  },
    chromeWebSecurity: false,
    defaultCommandTimeout: 3000,
    viewportWidth: 1920,
    viewportHeight: 1000,
    waitForAnimations:true
});