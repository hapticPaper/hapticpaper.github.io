import React, { useEffect, useState }  from "react"
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import NavDrawer from './NavDrawer.js';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';




const useStyles = makeStyles((theme) => ({
    list:{
        width: 250
    },
    palette: {
        type: "dark",
      },
    headerFormat:{
        backgroundColor:"black",
    },
    h1:{
        fontSize: '4.75vmin',
        fontWeight: 600,
        paddingTop: 18,
        paddingBottom: 2

    }

}));




export default function ControlHeader(props)  {
  const classes = useStyles()
  
  const subscription = useSelector(state => state.selectedSubscription);
  const route = useSelector(state => state.route);


  return (


<Grid container>
<AppBar id="appBarDiv" color='transparent' position="fixed" className={classes.headerFormat}>
  <Toolbar>
    <Grid
      justify="space-between" // Add it here :)
      container 
      spacing={2}
    >
      <Grid container item lg={10} md={10} sm={12} xs={12} >
        <Typography type="title" color="inherit" variant="h1"
        className={classes.h1}>
          Ian Rubenstein
        </Typography>
      </Grid>

      <Grid container item lg={2}  md={2} sm={2} xs={2} >

         
        
                
      </Grid>
    </Grid>
    <Toolbar>
    <Grid container item
        alignItems="flex-start"
        justify="space-evenly">
        <NavDrawer updateParams={props.updateParams} params={props.params}></NavDrawer >
            
            </Grid>
            </Toolbar>
  </Toolbar>
</AppBar>
</Grid>
  )
    ;
}


