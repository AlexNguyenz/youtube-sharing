import { WrapperWithInitState } from "~/utils/wrapper";
import { initToastState } from "../constants";
import toastState from "~/stores/toast";
import Toast from "~/components/Toast";

describe("render toast", () => {
  it("render correct ui", () => {
    cy.mount(
      <WrapperWithInitState recoilState={toastState} initValue={initToastState}>
        <Toast />
      </WrapperWithInitState>
    );
    cy.get("div.ant-notification-notice-message")
      .invoke("text")
      .should("eq", initToastState.message);
  });
});
