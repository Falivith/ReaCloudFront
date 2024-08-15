import React from "react";
import { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  CircularProgress,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  useTheme,
} from "@mui/material";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import ReaCloudLogo from "../assets/RClogo.svg";
import UserLogo from "../assets/User_circle_light.png";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { loginWithGoogle, getProfilePicture } from "../services/authentication";

const Navbar = () => {
  const navigate = useNavigate();
  const routeChangeHandler = (route) => {
    navigate(`/${route}`);
  };
  const theme = useTheme(); // para o drawer

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        // necessario pra nao pegar a ultima pfp carregada
        setProfilePicture(null);

        const status = await loginWithGoogle(code);
        localStorage.setItem("isLoggedIn", JSON.stringify(status));

        if (status) {
          fetchProfilePic();
        }

        setIsLoggedIn(status);
      } catch (error) {
        console.error("Login failed:", error);
        setIsLoggedIn(false);
      }
    },
    onError: () => {
      console.log("Login Failed");
      setIsLoggedIn(false);
    },
    flow: "auth-code",
  });

  // precisa ter esse fetch pra ele conseguir mudar a pfp caso log off -> new user log on
  const fetchProfilePic = async () => {
    try {
      const pic = await getProfilePicture();
      setProfilePicture(pic);
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
      setProfilePicture(null);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    setProfilePicture(null);
    navigate("/");
  };

  useEffect(() => {
    // isso aqui é pra mostrar um carregamento na navbar caso demore para logar
    const checkConnectionSpeed = () => {
      const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;
      const slowConnections = ["slow-2g", "2g", "3g"];

      if (connection && slowConnections.includes(connection.effectiveType)) {
        setIsLoading(true);
      }

      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        fetchProfilePic();
      }

      setIsLoading(false);
    };

    checkConnectionSpeed();
  }, []);

  // drawer para abrir o menu hamburger em telas pequenas
  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xxl" sx={{ px: 0 }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => routeChangeHandler("")}
              edge="start"
              color="inherit"
              aria-label="logo"
              sx={{ ml: 0.5 }}
            >
              <img src={ReaCloudLogo} alt="ReaCloud Logo" />
            </IconButton>
            <Typography variant="h5" sx={{ mr: 3 }}>
              ReaCloud
            </Typography>
          </Box>
          {/* Desktop Menu */}
          <Box
            id="navbarMenus"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Button
              onClick={() => routeChangeHandler("addrea")}
              color="secondary"
              variant="contained"
              sx={{ mr: 3, fontWeight: "bold" }}
            >
              ADICIONAR RECURSO
            </Button>
            {isLoading ? (
              <CircularProgress color="inherit" size={24} />
            ) : isLoggedIn ? (
              <>
                <Button
                  id="profile"
                  onClick={() => routeChangeHandler("profile")}
                  color="inherit"
                  sx={{ mr: 3 }}
                  startIcon={
                    <Avatar
                      src={profilePicture || UserLogo}
                      alt="Profile Picture"
                      sx={{ width: 24, height: 24 }}
                    />
                  }
                >
                  MEU PERFIL
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  startIcon={<Logout />}
                >
                  SAIR
                </Button>
              </>
            ) : (
              <Button id="loginButton" color="inherit" onClick={googleLogin}>
                ENTRE OU CADASTRE-SE
              </Button>
            )}
          </Box>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            color="inherit"
            edge="end"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {/* Drawer (Hamburger Menu) */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.primary.main, // Background color from theme
            color: theme.palette.primary.contrastText, // Text color from theme
          },
        }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItemButton
              button
              onClick={() => routeChangeHandler("addrea")}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                },
                borderRadius: "4px",
                padding: "12px 16px",
              }}
            >
              <ListItemText primary="ADICIONAR RECURSO" />
            </ListItemButton>
            {isLoading ? (
              <ListItem>
                <CircularProgress color="inherit" size={24} />
              </ListItem>
            ) : isLoggedIn ? (
              <>
                <ListItemButton
                  button
                  onClick={() => routeChangeHandler("profile")}
                  sx={{marginTop: "8px"}}
                >
                  <Avatar
                    src={profilePicture || UserLogo}
                    sx={{ width: 24, height: 24, mr: 2 }}
                  />
                  <ListItemText primary="MEU PERFIL" />
                </ListItemButton>
                <ListItemButton button onClick={handleLogout}
                  sx={{marginTop: "8px"}}
                >
                  <ListItemText primary="SAIR" />
                </ListItemButton>
              </>
            ) : (
              <ListItemButton button onClick={googleLogin}
              sx={{marginTop: "8px"}}
              >
                <ListItemText primary="ENTRE OU CADASTRE-SE" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};
export default Navbar;
