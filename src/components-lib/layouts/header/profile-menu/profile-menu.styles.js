import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  menu: {
    "& .MuiMenu-paper": {
      backgroundColor: "#282828",
      width: "10%",
      color: "#757575",
    },
    "& .MuiMenuItem-root:hover": {
      color: "#ffffff",
    },
  },
}));
