/// <reference types="cypress" />

import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import menu from "../page_object/menu";
import address from "../page_object/address";
import addressTestCases from "../fixtures/addressTestCases.json";

let addressData;
const pathsToCheck = [
  "/customer/address/new/",
  "/customer/address/edit/id/2885/",
];

describe("E2E-Add user address", { testIsolation: false }, () => {
  addressTestCases.forEach((testCase) => {
    context(`Test case "${testCase.description}"`, () => {
      before(() => {
        cy.resetCacheAndSetLoginPage();
        cy.login(); // Changed from cy.loginIn()
        cy.fixture("addressData.json").then((data) => {
          addressData = data;
        });
      });

      context("Navigate to the account page", () => {
        it("Should successfully go to my account page", () => {
          menu.listMenu.click({ force: true });
          menu.myAccountButton.click({ force: true }); // Corrected typo
          cy.getPageTitle().should("exist").and("contain", "My Account");
          cy.location("pathname").should("eq", "/customer/account/");
        });

        it("Should successfully go to the address book tab", () => {
          cy.clickLinkByText("Address Book");
          cy.clickLinkByText("Change Shipping Address");
          cy.getPageTitle()
            .should("exist")
            .invoke("text")
            .then((title) => {
              expect(title).to.satisfy((text) => {
                return (
                  text.includes("Add New Address") ||
                  text.includes("Edit Address")
                );
              });
            });
          cy.location("pathname").should((pathname) => {
            expect(pathsToCheck).to.include(pathname);
          });
        });

        context("Complete address fields", () => {
          it("Should complete fields in the contact information section", () => {
            address.companyField.clear().type(addressData.company);
            address.phoneNumberField.clear().type(addressData.phoneNumber);
          });

          it("Should complete fields in the address section", () => {
            address.streetAddressField.clear().type(addressData.street);
            address.cityField.clear().type(addressData.city);
            address.zipCodeField.clear().type(addressData.zipCode);
            address.countryField.select(addressData.country);
            address.regionField.select(addressData.state);
          });

          // Uncomment this block if needed
          // it("Should check if the fields contain the entered values", () => {
          //   address.firstname.should(
          //     "have.value",
          //     Cypress.env("expectedValues").firstname
          //   );
          //   address.lastname.should(
          //     "have.value",
          //     Cypress.env("expectedValues").lastname
          //   );
          //   address.companyField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").company
          //   );
          //   address.phoneField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").phoneNumber
          //   );
          //   address.streetAddressField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").street
          //   );
          //   address.cityField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").city
          //   );
          //   address.zipCodeField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").zipCode
          //   );
          //   address.countryField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").country
          //   );
          //   address.stateField.should(
          //     "have.value",
          //     Cypress.env("expectedValues").state
          //   );
          // });

          // Uncomment this block if needed
          // context("Adding address to the user account", () => {
          //   it("Should click on the save address button and confirm that the address has been added", () => {
          //     cy.clickSpanByText("Save Address");
          //     // cy.getElementByDiv("message-success")
          //     //   .should("exist")
          //     //   .and("contain", "You saved the address.");
          //     // cy.location("pathname").should("eq", "/customer/address/index/");
          //   });
          // });
        });
      });
    });
  });
});
