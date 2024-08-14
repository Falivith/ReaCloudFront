import React from 'react';
import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography, Box, Button, IconButton, Container, CircularProgress, Avatar } from '@mui/material';
import { Logout } from '@mui/icons-material';
import ReaCloudLogo from "../assets/RClogo.svg";
import UserLogo from "../assets/User_circle_light.png";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { loginWithGoogle, getProfilePicture } from "../services/authentication";

const Navbar = () => {
  const navigate = useNavigate();
  const routeChangeHandler = (route) => {
    navigate(`/${route}`);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const status = await loginWithGoogle(code);
      localStorage.setItem("isLoggedIn", JSON.stringify(status));
      setIsLoggedIn(status);
    },
    onError: () => {
      console.log('Login Failed');
      setIsLoggedIn(false);
    },
    flow: "auth-code",
  });

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const checkConnectionSpeed = () => {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const slowConnections = ['slow-2g', '2g', '3g'];

      if (connection && slowConnections.includes(connection.effectiveType)) {
        setIsLoading(true);
      }

      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      setIsLoading(false);
    };

    const getProfilePic = async () => {
      try {
        const pic = await getProfilePicture();
        //console.log(pic);
        setProfilePicture(pic);
      } catch (error) {
        //console.error('Failed to fetch profile picture:', error);
        setProfilePicture(null);
      }
    };

    getProfilePic();
    checkConnectionSpeed();
  }, []);


  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xxl" sx={{ px: 0 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => routeChangeHandler("")} edge="start" color="inherit" aria-label="logo" sx={{ ml: 0.5 }}>
              <img src={ReaCloudLogo} alt="ReaCloud Logo" />
            </IconButton>
            <Typography variant="h5" sx={{ mr: 3 }}>
              ReaCloud
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => routeChangeHandler("addrea")} color="secondary" variant="contained" sx={{ mr: 3, fontWeight: 'bold' }} >ADICIONAR RECURSO</Button>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : isLoggedIn ? (
              <>
                <Button id='profile' onClick={() => routeChangeHandler("profile")} color="inherit" sx={{ mr: 3 }} startIcon={
                  <Avatar
                    src={profilePicture || UserLogo}
                    alt="Profile Picture/Foto de Perfil"
                    sx={{ width: 24, height: 24 }}
                  />
                }>Meu Perfil</Button>
                <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>Sair</Button>
              </>
            ) : (
              <Button id='loginButton' color="inherit" onClick={googleLogin}>ENTRE OU CADASTRE-SE</Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;