import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";

const drawerWidth = 220;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    color: "#ffffff",
    backgroundColor: "transparent",
    transition: theme.transitions.create(["background-color"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  appBarScrolled: {
    backgroundColor: "#000000",
    transition: theme.transitions.create(["background-color"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  navigationButtons: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    "& button": {
      color: Colors.White,
      backgroundColor: Colors.Black,
      width: 35,
      height: 35,
      marginRight: 10,
    },
  },
  chip: {
    height: "35px",
    fontSize: "12px",
    borderRadius: 25,
    backgroundColor: Colors.Black,
    display: "flex",
    justifyContent: "space-between",
    "& img": {
      height: 30,
      width: 30,
      borderRadius: "50%",
    },
  },
}));
