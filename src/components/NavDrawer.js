import React from "react"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';

import { useDispatch } from "react-redux";
import {switchPage} from '../actions/index'

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


import IconButton from '@material-ui/core/IconButton';
import AppsIcon from '@material-ui/icons/Apps';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HomeIcon from '@material-ui/icons/Home';

import { ROUTES } from '../constants/routes'

    
    

const useStyles = makeStyles((theme) => ({
    list:{
        width: 250
    },
    palette: {
        type: "dark",
      }
}));


export default function ControlHeader(props)  {

    const dispatch = useDispatch()
    const classes = useStyles();
 
  const [state, setState] = React.useState(false);


  const handleClick = (route) => () =>{
    dispatch(switchPage(route))
    //setState(false)
    return;
  }
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState(open);
  };
  
  
  const entries = Object.entries(ROUTES).map(([k,v])=>{return Object.entries(v).map(([k,v])=>{
    console.log(`<ListItem button key=${k} id=${k}
    onClick={handleClick(${k})}>
    <ListItemIcon><HomeIcon/></ListItemIcon>
    <ListItemText primary=${v.label} />
</ListItem>`)
          return <ListItem button key={k} id={k}
                                            onClick={handleClick(k)}>
                                            <ListItemIcon><HomeIcon/></ListItemIcon>
                                            <ListItemText primary={v.label} />
                          </ListItem>
           }
        )})
  
  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {entries}
      </List>
      <List>
      
      <ListItem button key='Bio' id='Bio'
          onClick={handleClick('Bio')}>
            <ListItemIcon><PermIdentityIcon/></ListItemIcon>
            <ListItemText primary="Ian's Bio" />
          </ListItem>
      </List>
    </div>
  );






  return (

            <React.Fragment key='navmenu'>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={toggleDrawer(true)}
                    className={classes.palette}
                >
                    <AppsIcon />
                </IconButton>
            <SwipeableDrawer 
            anchor='right' 
            open={state}
            onOpen={function(){}}
            onClose={toggleDrawer(false)}>
                {list}
            </SwipeableDrawer>
            </React.Fragment>

    
        );
}


