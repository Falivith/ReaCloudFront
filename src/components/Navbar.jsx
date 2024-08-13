import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Navbar = () => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xxl" sx={{ px: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }} >
          <Typography variant="h6">
            Reacloud
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <Button color="secondary" variant="contained" sx={{ mr: 3, fontWeight: 'bold' }} >ADICIONAR RECURSO</Button>
            <Button color="inherit">ENTRE OU CADASTRE-SE</Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;