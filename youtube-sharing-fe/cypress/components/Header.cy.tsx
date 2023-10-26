import HeaderComponent from "~/components/Header";
import authState from "~/stores/user";
import { Wrapper, WrapperWithInitState } from "~/utils/wrapper";
import { CONSTANT_DATA_CY, initAuthState } from "../constants";

describe("header", () => {
  it("render component", () => {
    cy.mount(
      <Wrapper>
        <HeaderComponent />
      </Wrapper>
    );
  });

  it("display correct logo and title", () => {
    cy.mount(
      <Wrapper>
        <HeaderComponent />
      </Wrapper>
    );
    cy.get("p").contains("Funny Movies");
    cy.get("svg").should("be.visible");
  });

  it("display correct when logged", () => {
    cy.mount(
      <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
        <HeaderComponent />
      </WrapperWithInitState>
    );
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(initAuthState.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });

  it("display correct when not login", () => {
    cy.mount(
      <Wrapper>
        <HeaderComponent />
      </Wrapper>
    );
    cy.get(CONSTANT_DATA_CY.EMAIL).should("exist");
    cy.get(CONSTANT_DATA_CY.PASSWORD).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGIN).should("exist");
    cy.get(CONSTANT_DATA_CY.REGISTER).should("exist");
  });
});
