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
  {
    description: "Password too short",
    user: {
      firstname: "Adam",
      lastname: "Zieliński",
      password: "Pwd1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Password without uppercase letter",
    user: {
      firstname: "Katarzyna",
      lastname: "Wiśniewska",
      password: "password1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Password without digit",
    user: {
      firstname: "Michał",
      lastname: "Wójcik",
      password: "Password!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Password without special character",
    user: {
      firstname: "Agnieszka",
      lastname: "Kwiatkowska",
      password: "Password1",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Missing lastname",
    user: {
      firstname: "Tomasz",
      lastname: "",
      password: "Password1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Email already in use",
    user: {
      firstname: "Piotr",
      lastname: "Kamiński",
      password: "Password1!",
      email: "janek14@o2.pl",
    },
    expectedSuccess: false,
  },
  {
    description: "Firstname with special characters",
    user: {
      firstname: "Jan@#$",
      lastname: "Kowalski",
      password: "Password1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Lastname with numbers",
    user: {
      firstname: "Anna",
      lastname: "Nowak123",
      password: "Password1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
  {
    description: "Empty user object",
    user: {},
    expectedSuccess: false,
  },
  {
    description: "Password with spaces",
    user: {
      firstname: "Grzegorz",
      lastname: "Brzęczyszczykiewicz",
      password: "Password 1!",
      email: generateRandomEmail(),
    },
    expectedSuccess: false,
  },
];

function generateRandomEmail() {
  const randomString = Math.random().toString(36).substring(2, 11);
  return `user_${randomString}@example.com`;
}
let registrationSuccessful = false;

describe("User registration scenarios", { testIsolation: false }, () => {
  testCases.forEach((testCase) => {
    context(`Test case: ${testCase.description}`, () => {
      before(() => {
        registrationSuccessful = false;
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
          cy.getPageTitle()
            .should("exist")
            .and("contain", "You are signed out");
          cy.wait(2000);
        }
      });
      it("Should complete registration fields", () => {
        if (testCase.user.firstname) {
          registration.firstname.type(testCase.user.firstname);
          registration.lastname.type(testCase.user.lastname);
          registration.email.type(testCase.user.email);
          registration.password.type(testCase.user.password);
          registration.confirmPassword.type(testCase.user.password);
        }
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
        } else {
          cy.get('div[generated="true"].mage-error').should("be.visible");
        }
      });
    });
  });
});
