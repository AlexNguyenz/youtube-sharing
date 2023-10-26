import authState from "~/stores/user";
import { Wrapper, WrapperWithInitState } from "~/utils/wrapper";
import { CONSTANT_DATA_CY, initAuthState } from "../constants";
import Drawer from "~/components/Drawer";

describe("render drawer", () => {
  context("drawer when logged", () => {
    beforeEach(() => {
      cy.mount(
        <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
          <Drawer />
        </WrapperWithInitState>
      );
    });
    it("render drawer when logged", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist");
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    });

    it("render open notification", () => {
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist").click();
      cy.get("div.ant-popover-title").contains("Notification");
    });

    it("render open and close notification", () => {
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist").click();
      cy.get("div.ant-popover-title").contains("Notification");
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist").click();
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    });

    it("render open drawer", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist").click();
      cy.get("div").contains(initAuthState.email).should("exist");
      cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
      cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
    });

    it("render open and close drawer", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist").click();
      cy.get("button.ant-drawer-close").should("exist").click();
      cy.get(CONSTANT_DATA_CY.MENU).should("exist");
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    });
  });

  context("drawer haven't login", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Drawer />
        </Wrapper>
      );
    });
    it("render drawer when haven't login", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist");
      cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("not.exist");
    });

    it("render open drawer when haven't login", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist").click();
      cy.get("div").contains("Login - Register").should("exist");
      cy.get(CONSTANT_DATA_CY.EMAIL).should(
        "have.attr",
        "placeholder",
        "Email"
      );
      cy.get(CONSTANT_DATA_CY.PASSWORD).should(
        "have.attr",
        "placeholder",
        "Password"
      );
      cy.get(CONSTANT_DATA_CY.LOGIN).contains("Login");
      cy.get(CONSTANT_DATA_CY.REGISTER).contains("Register");
    });

    it("render open and close drawer when haven't login", () => {
      cy.get(CONSTANT_DATA_CY.MENU).should("exist").click();
      cy.get("div").contains("Login - Register").should("exist");
      cy.get(CONSTANT_DATA_CY.EMAIL).should(
        "have.attr",
        "placeholder",
        "Email"
      );
      cy.get(CONSTANT_DATA_CY.PASSWORD).should(
        "have.attr",
        "placeholder",
        "Password"
      );
      cy.get(CONSTANT_DATA_CY.LOGIN).contains("Login");
      cy.get(CONSTANT_DATA_CY.REGISTER).contains("Register");
      cy.get("button.ant-drawer-close").click();
      cy.get(CONSTANT_DATA_CY.MENU).should("exist");
    });
  });
});
