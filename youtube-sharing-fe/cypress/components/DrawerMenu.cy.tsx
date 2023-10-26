import { Wrapper } from "~/utils/wrapper";
import { CONSTANT_DATA_CY } from "../constants";
import DrawerMenu from "~/components/DrawerMenu";

describe("drawer menu", () => {
  it("render correct ui", () => {
    const onClose = cy.spy();
    cy.mount(
      <Wrapper>
        <DrawerMenu onClose={onClose} />
      </Wrapper>
    );
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE).should("exist");
    cy.get(CONSTANT_DATA_CY.LOGOUT).should("exist");
  });

  it("handle close when click share video", () => {
    const onClose = cy.spy();
    cy.mount(
      <Wrapper>
        <DrawerMenu onClose={onClose} />
      </Wrapper>
    );
    cy.get(CONSTANT_DATA_CY.SHARE_MOVIE)
      .should("exist")
      .click()
      .then(() => {
        expect(onClose).to.be.called;
      });
  });

  it("handle close when click logout", () => {
    const onClose = cy.spy();
    cy.mount(
      <Wrapper>
        <DrawerMenu onClose={onClose} />
      </Wrapper>
    );
    cy.get(CONSTANT_DATA_CY.LOGOUT)
      .should("exist")
      .click()
      .then(() => {
        expect(onClose).to.be.called;
      });
  });
});
