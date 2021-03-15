import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    details: {
        display: "flex",
        flexDirection: "column",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        "& a": {
            color: "#7d7a7a",
            fontSize: 14,
            textDecoration: "none",
            "&:hover": {
                color: "#ffffff",
                textDecoration: "underline",
            },
        },
    },
    favoriteIcon: {
        color: "#7d7a7a",
        "&:hover": {
            color: "#ffffff",
        },
    },
    cover: {
        width: 60,
        boxShadow: "3px 0px 18px #080707",
        cursor: "pointer",
        "&:hover": {
            color: "#ffffff",
        },
    },
}));
