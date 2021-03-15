import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  playlistNavigation: {
    borderTop: `1px solid ${theme.palette.grey[300]}`,
    alignItems: "center",
    position: "fixed",
    backgroundColor: "#282828",
    left: 0,
    bottom: 0,
    padding: "20px 20px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: 1,
    marginTop: 150,
  },
  progressive: {
    backgroundColor: "#acadb5",
    "& .MuiLinearProgress-bar": {
      backgroundColor: "#58585a",
    },
  },
  playContainer: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& svg": {
      color: theme.palette.grey[600],
    },
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiIconButton-root": {
      width: "3rem",
      height: "3rem",
    },
  },
  playIcon: {
    fontSize: 50,
    "&:hover": {
      fontSize: 55,
      color: "#ffffff",
    },
  },
  smallIcon: {
    fontSize: 20,
    "&:hover": {
      color: "#ffffff",
    },
  },
  expand: {
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "translateY(-25px)",
  },
}));
