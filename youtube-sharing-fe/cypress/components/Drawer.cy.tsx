import authState from "~/stores/user";
import { WrapperWithInitState } from "~/utils/wrapper";
import { initAuthState } from "../constants";
import Drawer from "~/components/Drawer";

describe("drawer", () => {
  it("render drawer", () => {
    cy.mount(
      <WrapperWithInitState recoilState={authState} initValue={initAuthState}>
        <Drawer />
      </WrapperWithInitState>
    );
  });
});
