import { Wrapper } from "~/utils/wrapper";
import { mockVideo } from "../constants";
import Video from "~/components/Video";
import { formatNumber } from "~/utils/formatNumber";

describe("render notification", () => {
  it("render correct ui", () => {
    cy.mount(
      <Wrapper>
        <Video video={mockVideo} />
      </Wrapper>
    );
    cy.get("iframe").should("exist");
    cy.get("p").contains(mockVideo.title).should("exist");
    cy.get("span")
      .contains(formatNumber(mockVideo.statistics.dislikeCount))
      .should("exist");
    cy.get("span")
      .contains(formatNumber(mockVideo.statistics.likeCount))
      .should("exist");
    cy.get("p").contains(mockVideo.userEmail).should("exist");
    const firstTenCharacters = mockVideo.description.substring(0, 10);
    cy.get("p").contains(firstTenCharacters).should("exist");
  });
});
