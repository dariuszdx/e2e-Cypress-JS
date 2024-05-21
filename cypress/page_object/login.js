class login {
    
    get signInClick() {
      return cy.clickLinkByText("Sign In");
    }
  
    get email() {
      return cy.getElementByID("email");
    }
  
    get password() {
      return cy.getElementByID("pass");
    }
  
    get signInButtonClick() {
      return cy.clickSpanByText('Sign In');
    }
  }
  export default new login();
  