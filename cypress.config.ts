import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'HomageReport',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: true,
  },
  
  video : false,

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    taskTimeout: 3000,
    specPattern: "cypress/e2e/**/*.{ts,tsx}",

    env: {
      HomageURL: "https://apply.homage.sg/"
    },
    retries: {
     runMode: 1,
     openMode: 1,
   },

   chromeWebSecurity: false,
   defaultCommandTimeout: 3000,
   viewportWidth: 1920,
   viewportHeight: 1000,
   waitForAnimations:true
  },
});