class registration {
  get firstname() {
    return cy.getElementByID("firstname");
  }
  get lastname() {
    return cy.getElementByID("lastname");
  }
  get email() {
    return cy.getElementByID("email_address");
  }
  get password() {
    return cy.getElementByID("password");
  }
  get confirmPassword() {
    return cy.getElementByID("password-confirmation");
  }
  get listMenu() {
    cy.get(":nth-child(2) > .customer-welcome > .customer-name > .action");
  }
  get logoutButton() {
    cy.clickLinkByText("Sign Out");
  }
}
export default new registration();
