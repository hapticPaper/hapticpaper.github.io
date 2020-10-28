import React, { useEffect }  from 'react'
import { useDispatch, useSelector } from "react-redux";


import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavDrawer from './components/NavDrawer'

import ControlHeader from './components/ControlHeader.js';
import { makeStyles } from '@material-ui/core/styles';

import './App.css'
import SocialFollow from "./SocialFollow"


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden'
  },
  mainViewport:{
    // marginTop: 50
    minHeight: '100vh'
  },
  fullwContainer: {
    // maxWidth: '100vh',
     minWidth:'100vw',
    // minHeight:'100vh',
    //paddingTop: '68px',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  bottomBar:{
    top: 'auto',
    bottom: 0,
    backgroundColor: '#181818'
  },
  scrollingBody:{
    maxHeight: 200, 
    overflow: 'auto'},
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

const ROUTES = {Welcome:<Typography variant="h2">Welcome Page</Typography>}
export default function App() {
  
  const route = useSelector(state=> state.route)
  const classes = useStyles();
  return (
    <div className={classes.root}>

        {/* <Container  className={classes.fullwContainer}> */}

        <Grid
            className={classes.fullwContainer}
            id="fullWithContainer"
            container
            item
            xs={12} sm={12} md={12} lg={12}
          >


<Grid container item id="c_header_grid_container"
            
            xs={12} sm={12} md={12} lg={12}>
            <ControlHeader id='dashHeader'>
            </ControlHeader>
          </Grid>
          {/* <Grid component item>{ROUTES[WeeklyTotals]}</Grid> */}

          <Grid container item 
            xs={12} sm={12} md={12} lg={12}
            alignItems="flex-start"
            id="mainViewPort"
            //style={scrollingBody}
            className={classes.mainViewport}
            >
              <Box width='100vw' mt={16}>

              {ROUTES[route]}
              </Box>
          </Grid>

          <AppBar position="fixed" className={classes.bottomBar} id="footerBar">
          <Toolbar>
            <Grid 
              alignItems="flex-end" 
              container item xs={12} sm={12} md={12} lg={12} alignItems="flex-end" className="Social">
                <SocialFollow />
            </Grid>
          </Toolbar>
        </AppBar>

        </Grid>
</div>

);
}
