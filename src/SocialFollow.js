import React from "react";
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    faLinkedin, 
    faGithub,
  } from "@fortawesome/free-brands-svg-icons";
import { makeStyles } from "@material-ui/core";
  

const useStyles = makeStyles((theme) => ({
    appBar: {
    top: 'auto',
    bottom: '2vmin'
  },
}))

export default function SocialFollow() {
  const classes = useStyles()

  return (
      <Grid container item spacing={2} direction='row' justify="center">
        <a href="https://www.linkedin.com/in/rubensteinian/"
            target="blank"
            className="linkedin social">
            <FontAwesomeIcon icon={faLinkedin} size="2x" color="white" />
        </a>
        <a href="https://github.com/hapticpaper" 
            target="blank"className="github social">
            <FontAwesomeIcon icon={faGithub} size="2x" color="white" />
        </a>

      </Grid>
  );
}