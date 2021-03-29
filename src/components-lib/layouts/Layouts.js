import React from "react";
import  Header  from "./header/Header";
import { DrawerMenu } from "./drawer/DrawerMenu";
import { PlayListNavigation } from "./playlist-navigation/PlayListNavigation";

export const Layouts = ({ children }) => {
  return (
    <>
      <Header />
      <DrawerMenu />
      <PlayListNavigation />
      <div style={{ marginLeft: 250, marginRight: 10, marginTop: "5%" }}>
        {children}
      </div>
      ;
    </>
  );
};
