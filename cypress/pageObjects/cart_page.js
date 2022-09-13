class CartPage {
  getSubtotalTitle() {
    return cy.get("#sc-subtotal-label-activecart");
  }
  getDeleteButton() {
    return cy.get(".sc-action-delete span input");
  }
}
export default CartPage;
