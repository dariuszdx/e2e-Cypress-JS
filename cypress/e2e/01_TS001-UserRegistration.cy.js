import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import registration from "../page_object/registration";
import "../support/logOut";
import "../support/logIn";
import testCases from "../fixtures/registrationTestCases.json";

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 11);
  return `user_${randomString}@example.com`;
}

let registrationSuccessful = false;

describe("User registration test scenario", { testIsolation: false }, () => {
  testCases.forEach((testCase) => {
    context(`Test case: ${testCase.description}`, () => {
      before(() => {
        registrationSuccessful = false;
        cy.resetCacheAndSetLoginPage();
        cy.clickLinkByText("Create an Account");
        cy.getPageTitle().should("exist").and("contain", "Create New Customer Account");
        cy.location("pathname").should("eq", "/customer/account/create/");
      });

      after(() => {
        if (registrationSuccessful) {
          cy.getSuccessNotification("Thank you for registering with Main Website Store.").should("exist");
          cy.logOut();
          cy.getPageTitle().should("exist").and("contain", "You are signed out");
          cy.wait(2000);
        }
      });

      it("Should complete registration fields", () => {
        registration.firstname.type(testCase.user.firstname);
        registration.lastname.type(testCase.user.lastname);
        registration.email.type(testCase.user.email || generateRandomEmail());
        registration.password.type(testCase.user.password);
        registration.confirmPassword.type(testCase.user.confirmPassword);
      });

      it("Should submit the form and check the result", () => {
        cy.clickSpanByText("Create an Account");
        cy.wait(2000);
        if (testCase.expectedSuccess) {
          registrationSuccessful = true;
          cy.getSuccessNotification(
            "Thank you for registering with Main Website Store."
          ).should("exist");
          cy.location("pathname").should("eq", "/customer/account/");
        } else if (testCase.description === "Email already in use") {
          cy.emailAlreadyInUse().should("be.visible");
        } else {
          cy.showErrorField().should("be.visible");
        }
      });
    });
  });
});
