import UserInfo from "~/components/UserInfo";
import { STORAGE_KEY } from "~/constant/localStorage";
import { Wrapper } from "~/utils/wrapper";

describe("user info", () => {
  beforeEach(() => {
    cy.mount(
      <Wrapper>
        <UserInfo />
      </Wrapper>
    );
    cy.clearAllLocalStorage();
  });
  context("display correct ui when no email", () => {
    it("", () => {
      cy.window().then((win) => {
        const email = win.localStorage.getItem(STORAGE_KEY.EMAIL);
        expect(email).equal(null);
        cy.get("p").invoke("text").should("have.length", 0);
      });
    });
  });

  context("display correct ui when have email", () => {
    it("", () => {
      localStorage.setItem(STORAGE_KEY.EMAIL, "text@example.com");
      cy.window().then((win) => {
        const email = win.localStorage.getItem(STORAGE_KEY.EMAIL);
        cy.get("p").contains(`${email}`);
      });
    });
  });
});
