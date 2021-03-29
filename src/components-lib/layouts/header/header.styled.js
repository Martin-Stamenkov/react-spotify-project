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
  indicator: {
    display: 'none',
    marginLeft: 30
  },
  appBarScrolled: {
    backgroundColor: "#000000",
    transition: theme.transitions.create(["background-color"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.standard,
    }),
  },
  tab: {
    minWidth: 80, 
    minHeight: 45,
    fontSize: 12,
  },
  navigationButtonsContainer: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    "& button": {
      color: Colors.White,
      width: 35,
      height: 35,
      marginRight: 10,
    },
    "& .Mui-selected": {
      backgroundColor: Colors.Grey02,
      borderRadius: 10
    },
    "& .PrivateTabIndicator-root-44": {
      display: "none"
    }

  },
  navigationButtons: {
    backgroundColor: Colors.Black,
    width: 30,
    height: 30,
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
