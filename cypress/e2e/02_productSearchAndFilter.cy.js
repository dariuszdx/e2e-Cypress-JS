import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import "../support/logOut";
import "../support/logIn";
import search from "../page_object/search";


describe("Product Search and Filter", { testIsolation: false }, () => {
  let testData;

  before(() => {
    cy.resetCacheAndSetLoginPage();
    cy.loginIn();
    cy.fixture("data.json").then((data) => {
      testData = data;
    });
  });

  after(() => {
    cy.logOut();
    cy.getPageTitle().should("exist").and("contain", "You are signed out");
  });

  context("Performing product search", () => {
    it("Should successfully type product name in search field", () => {
      search.searchField.type(testData.product);
    });
    it("Should check if the search field contains the entered value", () => {
      search.searchField.should("have.value", testData.product);
    });
    it("Should click on loop button and confirm that the product has been displayed", () => {
      search.loopButton.click();
      cy.verifySearchResultsContain(testData.product);
      cy.location("pathname").should("eq", "/catalogsearch/result/");
    });
    it("Should search product by filters within a specific range", () => {
      cy.clickOnCategoryTab(5, 1);
      cy.getPageTitle().should("exist").and("contain", "Tops");
      cy.location("pathname").should("eq", "/men/tops-men.html");
      cy.getFilterCategory(5).click();
      cy.getcolorByNumber("58").click({ force: true });
      cy.confirmFilterResult("Red");
    });
  });
});
