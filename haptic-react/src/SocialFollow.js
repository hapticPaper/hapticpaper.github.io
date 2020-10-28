import React from "react";
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faLinkedin,
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";
import { makeStyles } from "@material-ui/core";
  

const useStyles = makeStyles((theme) => ({
    appBar: {
    top: 'auto',
    bottom: '2vmin',
    color: 'rgb(0,0,0,0)'
  },
}))

export default function SocialFollow() {
  const classes = useStyles()

  return (
    <AppBar position="fixed" color={'rgb(0,0,0,0)'} className={classes.appBar} elevation={0}>
      <Grid container item spacing={2} direction='row' justify="center">
        <a href="https://www.linkedin.com/in/rubensteinian/"
            className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
        <a href="https://github.com/hapticpaper" className="github social">
            <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>

      </Grid>
    </AppBar>
  );
}