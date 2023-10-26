import UserInfo from "~/components/UserInfo";
import authState from "~/stores/user";
import { WrapperWithInitState } from "~/utils/wrapper";
import { CONSTANT_DATA_CY, initAuthState } from "../constants";

describe("user info", () => {
  beforeEach(() => {
    cy.mount(
      <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
        <UserInfo />
      </WrapperWithInitState>
    );
    cy.clearAllLocalStorage();
  });
  it("display correct ui ", () => {
    cy.get(CONSTANT_DATA_CY.EMAIL).contains(initAuthState.email);
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });
});
