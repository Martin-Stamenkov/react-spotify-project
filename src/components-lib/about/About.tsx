import React from "react";
import { Typography, Spacer } from "components-lib";
import { makeStyles } from "@material-ui/core/styles";
import { Colors } from "styles";

interface IAbout {
  type?: string;
  avatar?: string;
  description?: string;
  name: string;
  additionalInfo?: any;
  backgroundColor?: string;
  backgroundImage?: string;
  infoAvatar?: string;
}

export const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    padding: 50,
    paddingTop: 120,
    marginLeft: -30,
    marginRight: -10,
    marginTop: -120,
  },
  avatar: {
    width: "15%",
    height: "15%",
    borderRadius: "50%",
    boxShadow: "3px 0px 18px #2f2a2a",
  },
  name: {
    fontWeight: 900,
    fontSize: 50,
    color: Colors.White,
  },
  infoContainer: {
    marginLeft: "2%",
    textShadow: "3px 0px 18px #2f2a2a",
  },
  info: {
    color: Colors.White,
    display: "flex",
    alignItems: "center",
  },
  avatarInfo: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 50,
  },
});

export function About({
  type,
  avatar,
  name,
  description,
  additionalInfo,
  backgroundColor,
  backgroundImage,
  infoAvatar,
}: IAbout) {
  const classes = useStyles();

  return (
    <>
      <div
        className={classes.container}
        style={{
          background: `linear-gradient(${backgroundColor} , ${Colors.Black01})`,
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {avatar ? (
          <img className={classes.avatar} src={avatar} alt="Avatar" />
        ) : null}
        <div className={classes.infoContainer}>
          <Typography variant="body1" className={classes.info}>
            {type}
          </Typography>
          <div className={classes.name}>{name}</div>
          <Typography variant="body1" className={classes.info}>
            {description}
          </Typography>
          <Typography variant="body1" className={classes.info}>
            {infoAvatar ? (
              <img
                className={classes.avatarInfo}
                src={infoAvatar}
                alt="infoAvatar"
              />
            ) : null}
            {additionalInfo}
          </Typography>
        </div>
      </div>
      <Spacer height={20} />
    </>
  );
}
