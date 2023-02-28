const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const xlsx = require("xlsx");


async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  

  on("file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  );


  on('task',{
        
    generateJSONFromExcel(args){
      const wb = xlsx.readFile(args.excelFilePath, {dateNF: "mm/dd/yyyy" });
      const ws = wb.Sheets[args.sheetName];
      return xlsx.utils.sheet_to_json(ws, { raw: false });
    }
  
    
  })


  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    env: {
    },


    
  },
});
