// /// <reference types="cypress" />

// import "../support/resetCacheAndSetLoginPage";
// import "../support/commands";
// import menu from "../page_object/menu";
// import "../support/logOut";
// import "../support/logIn";
// import "../fixtures/addressData.json";
// import address from "../page_object/address";

// let addressData;

// describe("E2E-Add user address", { testIsolation: false }, () => {
//   before(() => {
//     cy.resetCacheAndSetLoginPage();
//     cy.loginIn();
//     cy.fixture("addressData.json").then((address) => {
//       addressData = address;
//     });
//   });

//   context("Navigate to the account page", () => {
//     it("Should successfully go to my account page", () => {
//       menu.listMenu.click({ force: true });
//       menu.myAccountButtton.click({ force: true });
//       cy.getPageTitle().should("exist").and("contain", "My Account");
//       cy.location("pathname").should("eq", "/customer/account/");
//     });

//     it("Should successfully go to the address book tab", () => {
//       cy.clickLinkByText("Address Book");
//       cy.getPageTitle().should("exist").and("contain", "Add New Address");
//       cy.location("pathname").should("eq", "/customer/address/new/");
//     });
//   });

//   context("Complete address fields", () => {
//     it("Should complete fields in the contact information section", () => {
//       address.companyField.clear().type(addressData.company);
//       address.phoneNumberField.clear().type(addressData.phoneNumber);
//     });

//     it("Should complete fields in the address section", () => {
//       address.streetAddressField.clear().type(addressData.street);
//       address.cityField.clear().type(addressData.city);
//       address.zipCodeField.clear().type(addressData.zipCode);
//       address.countryField.invoke("val", "").select(addressData.country);
//       address.regionField.invoke("val", "").select(addressData.state);
//     });

//       it("Should check if the fields contain the entered values", () => {
//         address.firstname.should(
//           "have.value",
//           Cypress.env("expectedValues").firstname
//         );
//         address.lastname.should(
//           "have.value",
//           Cypress.env("expectedValues").lastname
//         );
//         address.companyField.should(
//           "have.value",
//           Cypress.env("expectedValues").company
//         );
//         address.phoneField.should(
//           "have.value",
//           Cypress.env("expectedValues").phoneNumber
//         );
//         address.streetAddressField.should(
//           "have.value",
//           Cypress.env("expectedValues").street
//         );
//         address.cityField.should(
//           "have.value",
//           Cypress.env("expectedValues").city
//         );
//         address.zipCodeField.should(
//           "have.value",
//           Cypress.env("expectedValues").zipCode
//         );
//         address.countryField.should(
//           "have.value",
//           Cypress.env("expectedValues").country
//         );
//         address.stateField.should(
//           "have.value",
//           Cypress.env("expectedValues").state
//         );
//       });
//     });

//     context("Adding address to the user account", () => {
//       it("Should click on the save address button and confirm that the address has been added", () => {
//         address.saveAddressButton.click();
//         cy.getElementByDiv("message-succes")
//           .should("exist")
//           .and("contain", "You saved the address.");
//         cy.location("pathname").should("eq", "/customer/address/index/");
//       });
//   });
// });
