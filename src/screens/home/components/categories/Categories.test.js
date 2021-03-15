import React from "react";
import { render, waitForElement } from "@testing-library/react";
import { Categories } from "./Categories";
import axiosMock from "mock/axios";
import { ProfileProvider } from "user";

describe(Categories.name, () => {
  it("Should render the categories", async () => {
    const { getByRole, debug } = render(
      <ProfileProvider>
        <Categories />
      </ProfileProvider>
    );

    axiosMock.get.mockResolvedValueOnce({ data: { test: "test" } });
    // const resolvedValue = await waitForElement(() => {
    //   expect(axiosMock.get).toHaveBeenCalledTimes(1);
    // });
  });
});
