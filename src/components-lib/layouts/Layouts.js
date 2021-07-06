import React from "react";
import Header from "./header/Header";
import { DrawerMenu } from "./drawer/DrawerMenu";
import { Footer, GuestUserFooter } from "./footer";
import { useProfile } from "user";
import { Box } from "@material-ui/core";
import { Storage } from "storage";

export const Layouts = ({ children }) => {
  const { profile } = useProfile();
  return (
    <>
      <Header />
      <DrawerMenu />
      {!profile && !Storage.getItem("accessToken") ? (
        <GuestUserFooter />
      ) : (
        <Footer />
      )}
      <Box style={{ marginLeft: 250, marginRight: 10, marginTop: "5%" }}>
        {children}
      </Box>
    </>
  );
};
