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
        // height: '80%',
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
    playLists:{ overflowY: "scroll",'&::-webkit-scrollbar': {
        width: 13
    },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgb(94 96 97)',
        outline: '1px solid slategrey'
      } },
}));
