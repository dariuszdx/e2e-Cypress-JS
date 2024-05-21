
Cypress.Commands.add("logOut", ()=> {
    cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').should("be.visible").click();
    cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').should("be.visible").click();
    cy.getPageTitle()
        .should("exist")
        .and("contain", "You are signed out")
  });