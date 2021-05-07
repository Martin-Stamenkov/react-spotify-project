import React from "react";
import { render } from "@testing-library/react";
import { Home } from "./Home";
import { ProfileProvider } from "user";

describe(Home.name, () => {
  it("Should render the home screen", () => {
    const { getByText } = render(
      <ProfileProvider>
        <Home />
      </ProfileProvider>
    );
  });
});
