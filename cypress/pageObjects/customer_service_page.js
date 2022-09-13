class CustomerServicePage {
  getTextInputForm() {
    return cy.get("label form");
  }
  getSearchResultsTitle() {
    return cy.get("p[class=a-color-secondary] b");
  }
}
export default CustomerServicePage;
