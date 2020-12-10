import React from 'react'
import Typography from '@material-ui/core/Typography';

import Welcome from '../components/Welcome'

export const ROUTES = {General:{Welcome:{component:<Welcome/>, label: "Welcome"},
                        Photography:{component:<Typography variant="h2">Bio Coming Soon</Typography>, label: "Photography"}},
                    Specific:{
                        Bio:{component:<Typography variant="h2">Bio Coming Soon</Typography>, label: "Bio"}
                        }
                    }