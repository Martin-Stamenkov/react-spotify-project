import React from "react";
import { render } from "@testing-library/react";
import { Home } from "./Home";
import { ProfileProvider } from "user";

describe(Home.name, () => {
  it("Should render the home screen", () => {
    const { getByText, debug } = render(
      <ProfileProvider>
        <Home />
      </ProfileProvider>
    );

    // expect(getByText("Linkin Park")).toBeTruthy();
    // expect(getByText("artist")).toBeTruthy();
  });
});
