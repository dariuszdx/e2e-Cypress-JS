import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import "../support/logOut";
import "../support/logIn";
import search from "../page_object/search";

describe("Adding item to cart", { testIsolation: false }, () => {
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

  context("Search product", () => {
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
  });
  context("Add item to cart", () => {
    it("Should successfully choose item", () => {
      cy.findProductByName("Lono Yoga Short").click();
      cy.getPageTitle().should("exist").and("contain", "Lono Yoga Short");
      cy.location("pathname").should("eq", "/lono-yoga-short.html");
    });
    it("Should successfully add item to the cart", () => {
      cy.selectProductColor().eq(0).click();
      cy.selectItemSize().eq(0).click();
      cy.getButtonByText("Add to Cart").click();
      cy.getSuccessNotification(
        "You added Lono Yoga Short to your shopping cart."
      );
    });
    it("Should display and verify product in cart", () => {
      search.cart.click();
      cy.clickSpanByText("View and Edit Cart");
      cy.getPageTitle().should("exist").and("contain", "Shopping Cart");
      cy.location("pathname").should("eq", "/checkout/cart/");
      cy.getQtyCartField().should("have.value", "1");
      cy.getItemCartInfo().should("contain", "Lono Yoga Short");
    });
    it("Delete item from cart", () => {
      cy.deleteItemFromCart();
    });
  });
});
