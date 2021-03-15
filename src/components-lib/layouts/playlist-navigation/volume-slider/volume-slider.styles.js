import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    slider: {
        minWidth: "100px",
        width: "100px",

        "& .MuiSlider-rail": {
            color: "#ffffff",
            height: 4,
            "&:hover + .MuiSlider-track": {
                color: "#65ef7c",
            },
        },
        "& .MuiSlider-thumb": {
            color: "#ffffff",
            height: 15,
            "&:hover  .MuiSlider-track": {
                color: "#65ef7c",
            },
        },
        "& .MuiSlider-track": {
            color: "#ffffff",
            height: 4,
            "&:hover": {
                color: "#65ef7c",
            },
        },
    },
    volumeIcon: {
        color: theme.palette.grey[600],
        "&:hover": {
            color: "#ffffff",
        },
    },
}));
