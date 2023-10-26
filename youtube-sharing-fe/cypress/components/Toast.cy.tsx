import { WrapperWithInitState } from "~/utils/wrapper";
import { CONSTANT_DATA_CY, initToastState } from "../constants";
import toastState from "~/stores/toast";
import Toast from "~/components/Toast";

describe("render toast", () => {
  it("render correct ui", () => {
    cy.mount(
      <WrapperWithInitState recoilState={toastState} initValue={initToastState}>
        <Toast />
      </WrapperWithInitState>
    );
    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", initToastState.message);
  });
});
