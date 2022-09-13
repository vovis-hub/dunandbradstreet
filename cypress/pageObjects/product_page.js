import pdp_data from "../fixtures/product_page.json";
class ProductPage {
  getAddToCartButton() {
    return cy.get("#add-to-cart-button");
  }
  getMainImage() {
    return cy.get(".imgTagWrapper img");
  }
  getColorSelectionTitle() {
    return cy.get("#variation_color_name > .a-row > .selection");
  }
  getColorSelectionButton() {
    return cy
      .get("form[id='twister']")
      .find(`li[title='Click to select ${pdp_data.color_text}']`);
  }
  getSideCartMenu() {
    return cy.get(".ewc-active-cart ");
  }
}
export default ProductPage;
