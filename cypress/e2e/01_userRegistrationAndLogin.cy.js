import "../support/resetCacheAndSetLoginPage";
import "../support/commands";
import registration from "../page_object/registration";
import "../support/logOut";
import "../support/logIn";

const testCases = [
  {
    description: "Correct registration",
    user: {
      firstname: "Janusz",
      lastname: "Kowalski",
      password: "Password1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: true,
  },
  {
    description: "Missing firstname",
    user: {
      firstname: "",
      lastname: "Nowak",
      password: "Password2!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Invalid email format",
    user: {
      firstname: "Anna",
      lastname: "Nowak",
      password: "Password2!",
      email: "invalid-email",
    },
    expectedSuccess: false,
  },
];

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 11);
  return `user_${randomString}@example.com`;
}
let registrationSuccessful = true;

describe("User registration scenarios", { testIsolation: false }, () => {
  testCases.forEach((testCase) => {
    context(`Test case: ${testCase.description}`, () => {
      before(() => {
        cy.resetCacheAndSetLoginPage();
        cy.clickLinkByText("Create an Account");
        cy.getPageTitle()
          .should("exist")
          .and("contain", "Create New Customer Account");
        cy.location("pathname").should("eq", "/customer/account/create/");
      });

      after(() => {
        if (registrationSuccessful) {
          cy.getSuccessNotification(
            "Thank you for registering with Main Website Store."
          ).should("exist");
          cy.logOut();
          cy.getPageTitle().should("exist").and("contain", "You are signed out");
          cy.wait(2000)
        }
      });

      it("Should complete registration fields", () => {
        if (testCase.user.firstname) {
        registration.firstname.type(testCase.user.firstname);
        registration.lastname.type(testCase.user.lastname);
        registration.email.type(testCase.user.email);
        registration.password.type(testCase.user.password);
        registration.confirmPassword.type(testCase.user.password);
    }});

      it("Should submit the form and check the result", () => {
        cy.clickSpanByText("Create an Account");
        cy.wait(2000);
        if (testCase.expectedSuccess) {
          cy.getSuccessNotification(
            "Thank you for registering with Main Website Store."
          ).should("exist");
          cy.location("pathname").should("eq", "/customer/account/");
        } else {
          cy.get('div[generated="true"].mage-error').should('be.visible');
        }
      });
    });
  });
});
