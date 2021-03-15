import React from "react";
import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe(Spinner.name, () => {
  it("Should render the spinner", () => {
    const { getByRole } = render(<Spinner />);

    expect(getByRole("progressbar")).toBeTruthy();
  });
});
