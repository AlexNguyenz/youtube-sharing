import Form from "~/components/Form";
import Toast from "~/components/Toast";
import { Wrapper } from "~/utils/wrapper";
import { CONSTANT_DATA_CY } from "../constants";
import { MESSAGE } from "~/constant/message";

describe("render form", () => {
  it("render userInfo component", () => {
    cy.mount(
      <Wrapper>
        <Form />
      </Wrapper>
    );
  });

  context("display correct form before login", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Form />
        </Wrapper>
      );
    });
    it("display input", () => {
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
    });
    it("display button", () => {
      cy.get(CONSTANT_DATA_CY.LOGIN).contains("Login");
      cy.get(CONSTANT_DATA_CY.REGISTER).contains("Register");
    });
    it("display correct character input", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password");
      cy.get(CONSTANT_DATA_CY.EMAIL).should("have.value", "test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).should("have.value", "password");
    });
  });

  context("validate input with login", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Form />
        </Wrapper>
      );
    });
    it("enter correct email", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get(CONSTANT_DATA_CY.EMAIL)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect email", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get(CONSTANT_DATA_CY.EMAIL)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });

    it("enter correct password", () => {
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("123123123");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get(CONSTANT_DATA_CY.PASSWORD)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect password", () => {
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("123123");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get(".ant-input-password")
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });
  });

  context("validate input with register", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Form />
        </Wrapper>
      );
    });
    it("enter correct email", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get(CONSTANT_DATA_CY.EMAIL)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect email", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get(CONSTANT_DATA_CY.EMAIL)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });

    it("enter correct password", () => {
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("123123123");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get(CONSTANT_DATA_CY.PASSWORD)
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "0px none rgba(0, 0, 0, 0.88)");
    });
    it("enter incorrect password", () => {
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("123123");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get(".ant-input-password")
        .then(($el) => {
          return window.getComputedStyle($el[0]);
        })
        .invoke("getPropertyValue", "border")
        .should("equal", "1px solid rgb(255, 0, 0)");
    });
  });

  context("login with valid data", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Form />
          <Toast />
        </Wrapper>
      );
    });
    it("login success", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get("span.ant-notification-notice-icon-success").should("exist");
      cy.get("div.ant-notification-notice-message")
        .invoke("text")
        .should("eq", MESSAGE.SUCCESS.LOGIN);
    });

    it("login fail: user not found", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example123.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get("div.ant-notification-notice-message")
        .invoke("text")
        .should("eq", "User not found");
    });

    it("login fail: invalid credentials", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password123");
      cy.get(CONSTANT_DATA_CY.LOGIN).click();
      cy.get("div.ant-notification-notice-message")
        .invoke("text")
        .should("eq", "Invalid credentials");
    });
  });

  context("register with valid data", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <Form />
          <Toast />
        </Wrapper>
      );
    });
    it("register success", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get("div.ant-notification-notice-message")
        .invoke("text")
        .should("eq", MESSAGE.SUCCESS.REGISTER);
    });

    it("register fail: User already exists", () => {
      cy.get(CONSTANT_DATA_CY.EMAIL).type("test@example.com");
      cy.get(CONSTANT_DATA_CY.PASSWORD).type("password");
      cy.get(CONSTANT_DATA_CY.REGISTER).click();
      cy.get("div.ant-notification-notice-message")
        .invoke("text")
        .should("eq", "User already exists");
    });
  });
});
