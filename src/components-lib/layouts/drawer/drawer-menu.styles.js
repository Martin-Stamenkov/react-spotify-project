import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 220;

export const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        position: "fixed",
        zIndex: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        color: "#757575",
        backgroundColor: "#000000",
        "& hr": {
            backgroundColor: "#ffffff",
        },
        "& .MuiListItem-button:hover": {
            color: "#ffffff",
        },
    },
    logo: {
        width: "70%",
        color: "#757575",
    },
    logoContainer: {
        margin: 20,
    },
    items: {
        fontWeight: 800,
        marginLeft: 10,
    },
    playList: {
        marginTop: 20,
        marginLeft: 10,
        fontWeight: 900,
    },
}));
