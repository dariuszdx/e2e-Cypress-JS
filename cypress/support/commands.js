
Cypress.Commands.add("acceptCookies", () => {
    cy.get(`#cookiescript_accept`).click({ timeout: 5000, failOnStatusCode: false });
  });

Cypress.Commands.add("getIconByText", (text) => {
  cy.get(`.header-icon-button-text__text`).contains(text);
})
Cypress.Commands.add("clickLinkByText", (linkText) => {
  cy.contains('a', linkText).click();
});
Cypress.Commands.add("getElementByID", (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add("markCheckboxByIndex", (index) => {
  cy.get('input[type="checkbox"]').eq(index).click(({force:true}));
});
Cypress.Commands.add("clickButtonByText", (text) => {
  cy.get('.primary > .action submit primary').contains(text).click();
});
Cypress.Commands.add('getPageTitle', () => {
  cy.get('.base');
});
Cypress.Commands.add("clickSpanByText", (text) => {
  cy.contains('span', text).click();
});
Cypress.Commands.add("getSuccessNotification", (text) => {
  cy.get("div > .messages").should("exist").and("contain", text);
});
Cypress.Commands.add("verifySearchResultsContain", (text) => {
  cy.get('.column > .search').should('exist').should('contain.text', text); 
});
Cypress.Commands.add("clickOnCategoryTab", (categoryTabId, childIndex) => {
  cy.get(`a#ui-id-${categoryTabId}`).click();
  cy.get(`dd > .items > :nth-child(${childIndex}) > a`).click();
});
Cypress.Commands.add('getFilterCategory', (nth) => {
  cy.get(`:nth-child(${nth}) > .filter-options-title`);
});
Cypress.Commands.add("getcolorByNumber", (colorNumber) => {
  const hrefValue = `https://magento.softwaretestingboard.com/men/tops-men.html?color=${colorNumber}`;
  cy.get(`[href="${hrefValue}"] > .swatch-option`);
});
Cypress.Commands.add('confirmFilterResult',() => {
  cy.get(".filter-current > .items > .item").should("exist");
})
Cypress.Commands.add('findProductByName', (name) => {
  return cy.contains('.product-item-link', name);
});
Cypress.Commands.add("selectProductColor", () => {
  cy.get('.swatch-option.color')
});
Cypress.Commands.add("selectItemSize", () => {
  cy.get('.swatch-option.text')
});
Cypress.Commands.add("getButtonByText", (buttonText) => {
  cy.contains('#product-addtocart-button', buttonText);
});
Cypress.Commands.add("getQtyCartField", () => {
cy.get('input[name^="cart["][name$="][qty]"]');
})
Cypress.Commands.add("getItemCartInfo" , () => {
  cy.get(".item-info > .item");
})
Cypress.Commands.add("deleteItemFromCart", () => {
  cy.get(".action-delete").click();
})
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});






