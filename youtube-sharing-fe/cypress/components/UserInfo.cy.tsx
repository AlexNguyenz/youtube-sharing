import UserInfo from "~/components/UserInfo";
import authState from "~/stores/user";
import { WrapperWithInitState } from "~/utils/wrapper";
import { CONSTANT_DATA_CY, initAuthState } from "../constants";

describe("render user info", () => {
  it("render userInfo component", () => {
    cy.mount(
      <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
        <UserInfo />
      </WrapperWithInitState>
    );
  });

  it("display correct ui ", () => {
    cy.mount(
      <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
        <UserInfo />
      </WrapperWithInitState>
    );
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(initAuthState.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });
});
