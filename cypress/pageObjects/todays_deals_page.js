class TodaysDealsPage {
  getDepartmentsFilter() {
    return cy.get('[aria-label="Departments filter"] ul li label span');
  }
  getClearButton() {
    return cy.get('[aria-label="Clear departments filter"]');
  }
  getSelectAllButton() {
    return cy.get('[aria-label="Select all departments"]');
  }
}
export default TodaysDealsPage;
