import React from "react";
import { render } from "@testing-library/react";
import { CardContainer } from "./CardContainer";

describe(CardContainer.name, () => {
  it("Should render card container", () => {
    const { getByText } = render(<CardContainer title="Category" />);

    expect(getByText("Category")).toBeTruthy();
  });
});
