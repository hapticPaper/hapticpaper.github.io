import React from "react"
import ReactDOM from "react-dom"

import App from './App';
import './index.css'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
const store = createStore(rootReducer)


const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {main:'#FF4713'}
  },
  typography: {
    fontFamily: [
      'Roboto',
    ].join(','),
  }
});

  
ReactDOM.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
    , document.getElementById('root')
  );
  