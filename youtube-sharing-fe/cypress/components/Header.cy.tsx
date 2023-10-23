import HeaderComponent from "~/components/Header";
import { Wrapper } from "~/utils/wrapper";

describe("header", () => {
  it("render component", () => {
    cy.mount(
      <Wrapper>
        <HeaderComponent />
      </Wrapper>
    );
  });

  context("display correct ui", () => {
    beforeEach(() => {
      cy.mount(
        <Wrapper>
          <HeaderComponent />
        </Wrapper>
      );
    });
    it("display page title and svg", () => {
      cy.get("p").contains("Funny Movies");
      cy.get("svg").should("be.visible");
    });
  });
});
