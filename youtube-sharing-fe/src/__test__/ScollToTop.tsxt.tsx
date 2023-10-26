import { render } from "@testing-library/react";
import { scrollToTop } from "~/utils";

describe("scrollToTop", () => {
  it("should scroll to the top", () => {
    render(<div style={{ height: "2000px" }} />);
    scrollToTop();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
});
