import {Given,When,Then,} from "@badeball/cypress-cucumber-preprocessor";


Then("User should be able to read from excel sheet", () => {
    const excelFilePath = "cypress\\e2e\\Misc\\Test.xlsx";
    const sheetName = "login";
    cy.task("generateJSONFromExcel", {excelFilePath, sheetName}).then((user) => {
      cy.log(user[0].Name)
      cy.log(user[0].Address)
  })
})  

