/// <reference types="cypress" />

import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import menu from "../page_object/menu";
import registration from "../page_object/registration";
import "../support/logOut";
import "../support/logIn";

describe("E2E-Add user address", { testIsolation: false }, () => {
  before(() => {
    cy.resetCacheAndSetLoginPage();
    cy.loginIn();
  });
  // after(() => {
  //   cy.logOut();
  //   cy.getPageTitle().should("exist").and("contain", "You are signed out");
  // });

  context("Navigate to the address book", () => {
    it("Should successfully go to my account page", () => {
      menu.listMenu.click({ force: true });
      menu.myAccountButtton.click({ force: true });
      // cy.getElementWithClassBase().should("exist").and("contain", "My Account");
      // cy.location("pathname").should("eq", "/customer/account/");
    });

  //   it("Should successfully go to the address book tab", () => {
  //     address.addressBookTab.click();
  //     cy.getPageTitle()
  //       .should("exist")
  //       .and("contain", "Create New Customer Account");
  //     cy.location("pathname").should("eq", "/customer/account/create/");
  //   });
  // });

  // context("Complete address fields", () => {
  //   it("Should complete fields in the contact information section", () => {
  //     address.companyField.clear().type(Cypress.env("company"));
  //     address.phoneField.clear().type(Cypress.env("phoneNumber"));
  //   });

  //   it("Should complete fields in the address section", () => {
  //     address.streetAddressField.clear().type(Cypress.env("street"));
  //     address.cityField.clear().type(Cypress.env("city"));
  //     address.zipCodeField.clear().type(Cypress.env("zipCode"));
  //     address.countryField.invoke("val", "").select(Cypress.env("country"));
  //     address.stateField.invoke("val", "").select(Cypress.env("state"));
  //   });

  //   it("Should check if the fields contain the entered values", () => {
  //     address.firstname.should(
  //       "have.value",
  //       Cypress.env("expectedValues").firstname
  //     );
  //     address.lastname.should(
  //       "have.value",
  //       Cypress.env("expectedValues").lastname
  //     );
  //     address.companyField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").company
  //     );
  //     address.phoneField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").phoneNumber
  //     );
  //     address.streetAddressField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").street
  //     );
  //     address.cityField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").city
  //     );
  //     address.zipCodeField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").zipCode
  //     );
  //     address.countryField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").country
  //     );
  //     address.stateField.should(
  //       "have.value",
  //       Cypress.env("expectedValues").state
  //     );
  //   });
  // });

  // context("Adding address to the user account", () => {
  //   it("Should click on the save address button and confirm that the address has been added", () => {
  //     address.saveAddressButton.click();
  //     cy.getElementByDiv("message-succes")
  //       .should("exist")
  //       .and("contain", "You saved the address.");
  //     cy.location("pathname").should("eq", "/customer/address/index/");
    // });
  });
});
