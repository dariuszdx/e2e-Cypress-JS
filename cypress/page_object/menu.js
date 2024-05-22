class menu {
    get listMenu() {
        return cy.get(
            ":nth-child(2) > .customer-welcome > .customer-name > .action"
        );
    }
    get myAccountButtton() {
        return cy.get(":nth-child(2) > .customer-welcome > .customer-menu > .header > :nth-child(1) > a");
    }
}
export default new menu();
