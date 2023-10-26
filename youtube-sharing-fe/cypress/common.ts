import { ROUTES } from "../src/constant/route";
import { CONSTANT_DATA_CY, mockAccount } from "./constants";

class CommonAction {
  static loginSuccess() {
    cy.clearAllLocalStorage();
    cy.visit(ROUTES.HOME);
    cy.get(CONSTANT_DATA_CY.EMAIL).should("exist").type(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.PASSWORD)
      .should("exist")
      .type(mockAccount.password);
    cy.get(CONSTANT_DATA_CY.LOGIN).should("exist").click();
  }

  static registerSuccess() {
    cy.clearAllLocalStorage();
    cy.visit(ROUTES.HOME);
    cy.get(CONSTANT_DATA_CY.EMAIL).should("exist").type(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.PASSWORD)
      .should("exist")
      .type(mockAccount.password);
    cy.get(CONSTANT_DATA_CY.REGISTER).should("exist").click();
  }
}

export default CommonAction;
