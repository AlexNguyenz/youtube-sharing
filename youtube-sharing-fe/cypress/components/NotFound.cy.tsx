import NotFound from "~/pages/NotFound";
import { Wrapper } from "~/utils/wrapper";

describe("render not found page", () => {
  it("render correct ui", () => {
    cy.mount(
      <Wrapper>
        <NotFound />
      </Wrapper>
    );
    cy.get("div").contains("404");
    cy.get("div").contains("Sorry, the page you visited does not exist.");
    cy.get("button").invoke("text").should("eq", "Back Home");
  });
});
