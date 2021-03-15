import React from "react";
import { render } from "@testing-library/react";
import { About } from "./About";

describe(About.name, () => {
  it("Should render the about info", () => {
    const { getByText } = render(
      <About
        type="profile"
        name="Martin Stamenkov"
        additionalInfo="followers 3"
        avatar=""
      />
    );

    expect(getByText("profile")).toBeTruthy();
    expect(getByText("Martin Stamenkov")).toBeTruthy();
    expect(getByText("followers 3")).toBeTruthy();
  });
});
