import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

function Footer() {
  return (
      <AppBar position="static" color="primary" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar>
              
              <Box sx={{ flexGrow: 1 }} />
              
          </Toolbar>
      </AppBar>
  )
}

export default Footer