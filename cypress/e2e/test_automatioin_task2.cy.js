import HomePage from "../pageObjects/home_page";
import CartPage from "../pageObjects/cart_page";
import ProductPage from "../pageObjects/product_page";
import TodaysDealsPage from "../pageObjects/todays_deals_page";

import home_page_data from "../fixtures/home_page.json";
import cart_data from "../fixtures/cart_page.json";
import pdp_data from "../fixtures/product_page.json";

describe("test Amazon task 2", () => {
  beforeEach(() => {
    const pdp = new ProductPage();
    const cart = new CartPage();
    cy.wrap(cart_data.products_for_cart).each((product_url) => {
      // Navigate to provided product url
      cy.visit(product_url);
      // Clik on the "Add to Cart" button
      pdp.getAddToCartButton().click();
      // Wait for the item to be added to the cart
      cy.wait(2000);
    });
    // Navigate to the cart page
    cy.visit(cart_data.url);
    // Validate that the correct number of items are in the cart
    cart
      .getSubtotalTitle()
      .should("contain", `${cart_data.products_for_cart.length} items`);
  });

  afterEach(() => {
    const cart = new CartPage();
    // Navigate to the cart page
    cy.visit(cart_data.url);
    // Validate that the cart is not empty
    cy.contains("Your Amazon Cart is empty").should("not.exist");
    // Click on 1st cart items' Delete buttons
    cart.getDeleteButton().first().click({ force: true});
    // Click on 2nd cart items' Delete buttons
    cart.getDeleteButton().click({ force: true });
    // Validate that the cart is empty
    cy.contains("Your Amazon Cart is empty", {timeout: 5000}).should("exist");
  });

  it("test filter in Today's Deals", () => {
    const homePage = new HomePage();
    const td_page = new TodaysDealsPage();
    // Navigate to Amazon home page
    cy.visit(home_page_data.url);
    // Click on Today's Deals from the hamburger menu
    homePage
      .getPagesMenu()
      .contains(home_page_data.pages_menu_button_text[1])
      .click({ force: true });
    // Click on Amazon Devices filter
    td_page.getDepartmentsFilter().contains("Amazon Devices").click();
    // Validate "clear" button appeared
    td_page
      .getClearButton()
      .should("be.visible")
      // Click to clear the filters
      .click();
    // Validate "Select All" button appeared => meaning all filters are unchecked
    td_page.getSelectAllButton().should("exist");
  });

  it("test color selection button", () => {
    const pdp = new ProductPage();
    // Navigate to provided product page
    cy.visit(pdp_data.url);
    // Validate main image is visible
    pdp.getMainImage().should("be.visible");
    // Check that the product color title is not equal to the provided text
    pdp
      .getColorSelectionTitle()
      .should("not.contain.text", pdp_data.color_text);
    // Click on the relevant color selection button
    pdp.getColorSelectionButton().click();
    // Wait for the url to contain the provided color sku to avoid detachment errors
    cy.url().should("contain", pdp_data.color_sku);
    // Validate that the product color title is equal to the provided text
    pdp.getColorSelectionTitle().should("have.text", pdp_data.color_text);
  });

  it("test Add to Cart button", () => {
    const pdp = new ProductPage();
    // Navigate to provided product page
    cy.visit(pdp_data.url);
    // Click on Add to Cart button
    pdp.getAddToCartButton().click();
    // Validate that "Added to Cart" appears on screen
    cy.contains("Added to Cart").should("exist");
    // Reload page
    cy.visit(pdp_data.url);
    // Validate the cart items amount
    pdp.getSideCartMenu().find("[data-item-count='3']").should("exist");
  });
});
