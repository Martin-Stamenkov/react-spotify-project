import React, { useState } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Button } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";

export const useStyles = makeStyles({
    root: {
        color: "#7d7a7a",
        "&:hover": {
            color: "#ffffff",
        },
    },
    favoriteIcon: {
        color: Colors.MainGreen
    }
});

interface IFavoriteButton {
    width?: number;
    height?: number;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isFavorite?: boolean;
}

export const ButtonFavorite = ({ width, height, onClick, isFavorite }: IFavoriteButton) => {
    const classes = useStyles()

    const iconStyle = { width: width, height: height }

    return (

        < Button className={classes.root} onClick={onClick} >
            {isFavorite ? <FavoriteIcon  style={iconStyle}  className={classes.favoriteIcon} />
                : <FavoriteBorderIcon style={iconStyle} />
            }
        </ Button>
    );
};
