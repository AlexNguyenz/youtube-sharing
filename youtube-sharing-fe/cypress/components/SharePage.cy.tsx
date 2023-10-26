import { Wrapper } from "~/utils/wrapper";
import SharePage from "~/pages/SharePage";
import { CONSTANT_DATA_CY } from "../constants";
import { MESSAGE } from "~/constant/message";
import Toast from "~/components/Toast";
import { saveStorage } from "~/utils/storage";

const url =
  "https://www.youtube.com/watch?v=e2Xx7WcvEns&list=RD7JJfJgyHYwU&index=23";

const data = {
  email: "test@gmail.com",
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM3YWMxMWQwYTgzY2NmZDhlMzczZTMiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjk4MzM5MzI5fQ.6CKrGiN73G38fzjX1I7-313GyMC096wosi3wsLPsEPI",
};

describe("render share page", () => {
  beforeEach(() => {
    cy.mount(
      <Wrapper>
        <SharePage />
        <Toast />
      </Wrapper>
    );
  });
  it("render correct ui", () => {
    cy.get("p").contains("Share a Youtube movie");
    cy.get("label").contains("Youtube URL:");
    cy.get("input").should("have.length", 1);
    cy.get(CONSTANT_DATA_CY.SHARE).contains("Share");
    cy;
  });

  it("display correct input value", () => {
    cy.get("input").type(url);
    cy.get("input").invoke("val").should("eq", url);
  });

  it("share video success", () => {
    const data = {
      email: "test@gmail.com",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM3YWMxMWQwYTgzY2NmZDhlMzczZTMiLCJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjk4MzM5MzI5fQ.6CKrGiN73G38fzjX1I7-313GyMC096wosi3wsLPsEPI",
    };
    saveStorage(data);

    cy.get("input").type(url);
    cy.get("button").click();
    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", MESSAGE.SUCCESS.SHARE_VIDEO);
  });

  it("share video fail: Unauthorized", () => {
    cy.get("input").type(url);
    cy.get("button").click();
    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", "Unauthorized");
  });

  it.only("share video fail: video already exits", () => {
    saveStorage(data);
    cy.get("input").type(url);
    cy.get("button").click();
    cy.get(CONSTANT_DATA_CY.MESSAGE_NOTIFICATION)
      .invoke("text")
      .should("eq", "Video already exists");
  });
});
