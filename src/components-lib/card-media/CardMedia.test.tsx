import React from "react";
import { render } from "@testing-library/react";
import { CardMedia } from "./CardMedia";

describe(CardMedia.name, () => {
  it("Should render the card media", () => {
    const { getByText } = render(
      <CardMedia id="1" image="" name="Linkin Park" description="artist" />
    );

    expect(getByText("Linkin Park")).toBeTruthy();
    expect(getByText("artist")).toBeTruthy();
  });
});
