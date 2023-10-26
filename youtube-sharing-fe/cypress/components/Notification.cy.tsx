import { Wrapper, WrapperWithInitState } from "~/utils/wrapper";
import {
  CONSTANT_DATA_CY,
  initNotificationStateRead,
  initNotificationStateUnread,
} from "../constants";
import Notification from "~/components/Notification";
import notificationState from "~/stores/notification";

describe("drawer notification", () => {
  it("render correct ui", () => {
    cy.mount(
      <Wrapper>
        <Notification />
      </Wrapper>
    );
    cy.get(CONSTANT_DATA_CY.NOTIFICATION).should("exist");
  });

  it("render ui when have notification unread", () => {
    cy.mount(
      <WrapperWithInitState
        recoilState={notificationState}
        initValue={initNotificationStateUnread}
      >
        <Notification />
      </WrapperWithInitState>
    );
    cy.get('sup[data-show="true"]')
      .then(($el) => {
        return window.getComputedStyle($el[0]);
      })
      .invoke("getPropertyValue", "background-color")
      .should("equal", "rgb(22, 119, 255)");

    cy.get(CONSTANT_DATA_CY.NOTIFICATION).click();
    cy.get("p").contains(initNotificationStateUnread.notifications[0].title);
    cy.get("p").contains(initNotificationStateUnread.notifications[0].email);
    cy.get('sup[data-show="true"]').should("not.exist");
  });

  it("render ui when have notification read", () => {
    cy.mount(
      <WrapperWithInitState
        recoilState={notificationState}
        initValue={initNotificationStateRead}
      >
        <Notification />
      </WrapperWithInitState>
    );
    cy.get('sup[data-show="true"]').should("not.exist");

    cy.get(CONSTANT_DATA_CY.NOTIFICATION).click();
    cy.get("p").contains(initNotificationStateUnread.notifications[0].title);
    cy.get("p").contains(initNotificationStateUnread.notifications[0].email);
  });
});
