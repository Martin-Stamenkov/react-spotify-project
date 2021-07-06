import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { login } from 'auth';
import logo from "assets/spotify-transp-white-1.png"

const useStyles = makeStyles({
    login: {
        display: 'grid',
        placeItems: 'center',
        height: '50vh',

        '& img': {
            width: '50%'
        },

        '& a': {
            padding: '20px',
            borderRadius: '99px',
            backgroundColor: '#1db954',
            fontWeight: 600,
            color: 'white',
            textDecoration: 'none',
        },

        '& a:hover': {
            backgroundColor: ' white',
            borderColor: '#1db954',
            color: '#1db954',
        }
    },
});
export function Login() {
    const classes = useStyles()
    return (
        <div className={classes.login}>
            <img src={logo} alt="Spotify-Logo" />
            <a href={login} >LOGIN TO SPOTIFY</a>
        </div>
    )
}
