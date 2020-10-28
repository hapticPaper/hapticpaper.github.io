import React, { useEffect }  from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import './App.css'
import SocialFollow from "./SocialFollow"


export default function App() {
    let advice=""
  return (
      <Container maxWidth="100vw">
      
        <SocialFollow />
      </Container>
  );
}