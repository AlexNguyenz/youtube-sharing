import { ROUTES } from "../../src/constant/route";
import CommonAction from "../common";
import { CONSTANT_DATA_CY } from "../constants";

describe("SharePage spec", () => {
  beforeEach(() => {
    CommonAction.loginSuccess();
    cy.visit(ROUTES.SHARE);
  });

  it("correct pathname", () => {
    cy.location("pathname").should("eq", ROUTES.SHARE);
  });

  it.only("display correct ui when logout", () => {
    cy.get("p").contains("Funny Movies").click();
    cy.location("pathname").should("eq", ROUTES.HOME);
  });

  it.only("navigate to home page", () => {
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist").click();
    cy.location("pathname").should("eq", ROUTES.HOME);
  });
});
