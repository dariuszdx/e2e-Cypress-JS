class search {
    
    get searchField(){
        return cy.getElementByID('search');
    }
    get loopButton () {
        return cy.get('.actions>.action');
    }
    get cart(){
        return cy.get(".showcart")
    }
       get viewCart(){
        return cy.get(":nth-child(7) > .secondary > .action > span")
    }
}
export default new search();