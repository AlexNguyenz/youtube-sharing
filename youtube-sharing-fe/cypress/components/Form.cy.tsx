import Form from "~/components/Form";
import { STORAGE_KEY } from "~/constant/localStorage";
import { Wrapper } from "~/utils/wrapper";

describe("form", () => {
  beforeEach(() => {
    cy.mount(
      <Wrapper>
        <Form />
      </Wrapper>
    );
  });

  context("display correct form before login", () => {
    it("display input", () => {
      cy.get("input").eq(0).should("have.attr", "placeholder", "Email");
      cy.get("input").eq(1).should("have.attr", "placeholder", "Password");
    });
    it("display button", () => {
      cy.get("button").eq(0).contains("Login");
      cy.get("button").eq(1).contains("Register");
    });
    it("display correct character input", () => {
      cy.get("input").eq(0).type("test@example.com");
      cy.get("input").eq(1).type("password");
      cy.get("input").eq(0).should("have.value", "test@example.com");
      cy.get("input").eq(1).should("have.value", "password");
    });
  });

  context("validate input", () => {
    it("enter correct email", () => {
      cy.get("input").eq(0).type("test@example.com");
      cy.get("button").contains("Login").click();
      cy.get("input")
        .eq(0)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect email", () => {
      cy.get("input").eq(0).type("test");
      cy.get("button").contains("Login").click();
      cy.get("input")
        .eq(0)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });

    it("enter correct password", () => {
      cy.get("input").eq(1).type("123123123");
      cy.get("button").contains("Login").click();
      cy.get("input")
        .eq(1)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect password", () => {
      cy.get("input").eq(1).type("123123");
      cy.get("button").contains("Login").click();
      cy.get(".ant-input-password")
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });
  });

  context("login with valid data", () => {
    it("login success", () => {
      cy.get("input").eq(0).type("test@example.com");
      cy.get("input").eq(1).type("password");
      cy.get("button").contains("Login").click();

      cy.window().then((win) => {
        const email = win.localStorage.getItem(STORAGE_KEY.EMAIL);
        expect(email).to.equal("test@example.com");
      });
    });

    it("login fail", () => {});
  });

  context("register with valid data", () => {
    it("register success", () => {
      cy.get("input").eq(0).type("test@example.com");
      cy.get("input").eq(1).type("password");
      cy.get("button").contains("Register").click();

      cy.window().then((win) => {
        const email = win.localStorage.getItem(STORAGE_KEY.EMAIL);
        expect(email).to.equal("test@example.com");
      });
    });

    it("register fail", () => {});
  });
});
