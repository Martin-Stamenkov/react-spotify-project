import React from "react";
import { render } from "@testing-library/react";
import { ButtonIcon } from "./ButtonIcon";

describe(ButtonIcon.name, () => {
  it("Should render the icon button", () => {
    const { getByRole } = render(<ButtonIcon />);

    expect(getByRole("button")).toBeTruthy();
  });
});
