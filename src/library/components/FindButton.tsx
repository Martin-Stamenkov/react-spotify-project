import { ButtonBase, makeStyles } from "@material-ui/core";
import React, { MouseEventHandler } from "react";
import { Colors } from "styles";

interface IFindButton {
  onClick?: MouseEventHandler<{}>;
}


const useStyles = makeStyles(() => ({
  button: {
    width: '20%',
    height: 45,
    color: Colors.Black,
    backgroundColor: Colors.White,
    borderRadius: 50,
    fontSize: 18,
    border: `1px solid ${Colors.Grey02}`,
    "&:hover": {
      height: 50,
      width: '21%',
    },
  },
}));
export const FindButton: React.FC<IFindButton> = ({ children, onClick }) => {


  const classes = useStyles();

  return (
     <>
     <ButtonBase onClick={onClick} className={classes.button}>
       {children}
     </ButtonBase>
   </>
  );
}
