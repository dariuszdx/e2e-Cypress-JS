Cypress.Commands.add("resetCacheAndSetLoginPage", ()=> {
    cy.visit("/");
    cy.clearCookies();
    cy.clearLocalStorage();
  });