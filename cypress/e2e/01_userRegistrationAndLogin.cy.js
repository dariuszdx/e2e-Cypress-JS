import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import registration from "../page_object/registration";
import "../support/logOut";
import "../support/logIn";


describe("User registration and login", { testIsolation: false }, () => {
  before(() => {
    cy.resetCacheAndSetLoginPage();
  });

  after(() => {
    cy.logOut();
    cy.getPageTitle().should("exist").and("contain", "You are signed out");
  });

  context("Open registration page", () => {
    it("Should open the registration page", () => {
      cy.clickLinkByText("Create an Account");
      cy.getPageTitle()
        .should("exist")
        .and("contain", "Create New Customer Account");
      cy.location("pathname").should("eq", "/customer/account/create/");
    });
  });

  context("Complete registration fields", () => {
    it("Should complete fields in the personal information section", () => {
      registration.firstname.type(Cypress.env("firstname"));
      registration.lastname.type(Cypress.env("lastname"));
    });
    it("Should complete fields in the sign in information section", () => {
      registration.email.type(Cypress.env("email"));
      registration.password.type(Cypress.env("password"));
      registration.confirmPassword.type(Cypress.env("password"));
    });
    it("Should check if the fields contain the entered values", () => {
      registration.firstname.should(
        "have.value",
        Cypress.env("expectedValues").firstname
      );
      registration.lastname.should(
        "have.value",
        Cypress.env("expectedValues").lastname
      );
      registration.email.should(
        "have.value",
        Cypress.env("expectedValues").email
      );
      registration.password.should(
        "have.value",
        Cypress.env("expectedValues").password
      );
      registration.confirmPassword.should(
        "have.value",
        Cypress.env("expectedValues").password
      );
    });
  });

  context("Creating user account", () => {
    it("Should click on the create account button and confirm that the account has been created", () => {
      cy.clickSpanByText("Create an Account");
      cy.getSuccessNotification(
        "Thank you for registering with Main Website Store."
      );
      cy.location("pathname").should("eq", "/customer/account/");
    });
  });
  context("Logout from website", () => {
    it("Should logout from the website", () => {
      cy.logOut();
      cy.getPageTitle().should("exist").and("contain", "You are signed out");
    });
  });
  context("Login to the wbsite", () => {
    it("Should login with the newly created credential", () => {
      cy.loginIn();
      cy.url().should((url) => {
        expect(url).to.satisfy((url) => {
          return (
            url === "https://magento.softwaretestingboard.com/" ||
            url === "https://magento.softwaretestingboard.com/customer/account/"
          );
        });
      });
    });
  });
});
