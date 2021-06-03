import { Spacer } from "components-lib";
import React from "react";
import { Albums } from "../albums";

export function Discography() {
  return (
    <>
      <Albums withSeeAllFlag={false} albumLimit={20} />
      <Spacer height={100} />
    </>
  );
}
