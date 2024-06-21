class address {
  get companyField() {
    return cy.getElementByID("company");
  }
  get phoneNumberField() {
    return cy.getElementByID("telephone");
  }
  get streetAddressField() {
    return cy.getElementByID("street_1");
  }
  get cityField() {
    return cy.getElementByID("city");
  }
  get countryField() {
    return cy.getElementByID("country");
  }
  get zipCodeField() {
    return cy.getElementByID("zip");
  }
  get regionField() {
    return cy.getElementByID("region_id");
  }
}
export default new address();
