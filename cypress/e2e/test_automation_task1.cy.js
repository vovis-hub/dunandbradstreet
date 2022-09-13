import HomePage from "../pageObjects/home_page";
import CustomerServicePage from "../PageObjects/customer_service_page";

import home_page_data from "../fixtures/home_page.json";
import cs_data from "../fixtures/customer_service_page.json";

describe("test Amazon customer service page", () => {

  it("navigate to Amazon's main page", () => {
    // Navigate to Amazon home page
    cy.visit(home_page_data.url);
    // Validate the url
    cy.url().should("equal", home_page_data.url);
  });

  it("use menu button to get Customer Service page", () => {
    const homePage = new HomePage();
    // Navigate to Amazon home page
    cy.visit(home_page_data.url);
    // Click on Customer Service from the pages menu
    homePage
      .getPagesMenu()
      .contains(home_page_data.pages_menu_button_text[0])
      .click({ force: true });
    // Validate Customer Service page opened
    cy.url().should("contain", cs_data.url);
  });

  it("search for 'where is my stuff'", () => {
    const csPage = new CustomerServicePage();
    // Navigate to Customer Service page
    cy.visit(cs_data.url);
    // Find search form
    csPage
      .getTextInputForm()
      // Input the provided search term
      .type(cs_data.search_term, { delay: 0 })
      // Submit to search for the search term
      .submit();
    // Validate that the results are for the correct search term
    csPage.getSearchResultsTitle().should("contain", cs_data.search_term);
  });
});
