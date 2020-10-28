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
import BarChartIcon from '@material-ui/icons/BarChart';
import TimelineSharpIcon from '@material-ui/icons/TimelineSharp';
import FunctionsSharpIcon from '@material-ui/icons/FunctionsSharp';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

    
    

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
    props.updateParams({...props.params, 'route':route})
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

  const list = (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
          <ListItem button key='weeklyTotals' id='weeklyTotals'
          onClick={handleClick('WeeklyTotals')}>
          <ListItemIcon><BarChartIcon/></ListItemIcon>
          <ListItemText primary='Weekly Totals' />
        </ListItem> 
        <ListItem button key='weeklyBreakdown' id='weeklyBreakdown'
          onClick={handleClick('WeeklyBreakdown')}>
            <ListItemIcon><TimelineSharpIcon/></ListItemIcon>
            <ListItemText primary='Weekly Breakdown' />
          </ListItem>
      </List>
      <Divider/>
      <List>
      <ListItem button key='azureCalculator' id='azureCalculator'
          onClick={handleClick('AzureCalculator')}>
            <ListItemIcon><FunctionsSharpIcon/></ListItemIcon>
            <ListItemText primary='Azure Cost Calculator' />
          </ListItem>

      <ListItem button key='NextAddition' id='NextAddition'
          onClick={handleClick('NextAddition')}>
            <ListItemIcon><MonetizationOnIcon/></ListItemIcon>
            <ListItemText primary='Future Additions' />
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


