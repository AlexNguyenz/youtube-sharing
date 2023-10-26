import { MESSAGE } from "../../src/constant/message";
import { ROUTES } from "../../src/constant/route";
import CommonAction from "../common";
import { CONSTANT_DATA_CY, mockAccount } from "../constants";

describe("HomePage spec", () => {
  beforeEach(() => {
    cy.visit(ROUTES.HOME);
    cy.clearAllLocalStorage();
  });

  it("correct pathname", () => {
    cy.location("pathname").should("eq", ROUTES.HOME);
  });

  it("display correct ui when haven't login", () => {
    cy.get("p").contains("Funny Movies");
    cy.get("svg").should("be.visible");
    cy.get(CONSTANT_DATA_CY.EMAIL).should("exist");
    cy.get(CONSTANT_DATA_CY.PASSWORD).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGIN).should("exist");
    cy.get(CONSTANT_DATA_CY.REGISTER).should("exist");
  });

  it("display correct ui when login success", () => {
    cy.get("p").contains("Funny Movies");
    cy.get("svg").should("be.visible");
    CommonAction.loginSuccess();
    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", MESSAGE.SUCCESS.LOGIN);
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });

  it("display correct ui when register success", () => {
    CommonAction.registerSuccess();
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");

    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", MESSAGE.SUCCESS.REGISTER);
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });

  it("display correct ui when logout", () => {
    CommonAction.loginSuccess();
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(mockAccount.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist").click();

    cy.get(CONSTANT_DATA_CY.EMAIL)
      .contains(mockAccount.email)
      .should("not.exist");
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("not.exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("not.exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("not.exist");

    cy.get(CONSTANT_DATA_CY.EMAIL).should("exist");
    cy.get(CONSTANT_DATA_CY.PASSWORD).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGIN).should("exist");
    cy.get(CONSTANT_DATA_CY.REGISTER).should("exist");
  });

  it("navigate to share page", () => {
    CommonAction.loginSuccess();
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist").click();
    cy.location("pathname").should("eq", ROUTES.SHARE);
  });
});
