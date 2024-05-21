const { default: login } = require("../page_object/login");

Cypress.Commands.add("loginIn", ()=> {
    cy.clickLinkByText("Sign In");
    cy.getElementByID("email").type(Cypress.env("email"));
    cy.getElementByID("pass").type(Cypress.env("password"));
    cy.clickSpanByText('Sign In');
  });