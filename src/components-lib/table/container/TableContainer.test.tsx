import React from "react";
import { render } from "@testing-library/react";
import { TableContainer } from "./TableContainer";

describe(TableContainer.name, () => {
  it("Should render the table container", () => {
    const { getByText } = render(<TableContainer />);

    expect(getByText("Title")).toBeTruthy();
    expect(getByText("Album")).toBeTruthy();
    expect(getByText("Date Added")).toBeTruthy();
  });
});
