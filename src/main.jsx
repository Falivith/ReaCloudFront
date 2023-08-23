import React from 'react';
import ReactDOM from "react-dom/client";
import { MainPage } from "./pages/MainPage";
import { Explorer } from "./pages/Explorer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/Login";
import { Cadastrar } from "./pages/Cadastrar";
import { AddRea } from "./pages/AddRea";
import { ReaView } from "./pages/ReaView";
import { Recover } from "./components/login/Recover";
import { MeuPerfil } from "./pages/MeuPerfil";
import { PluginReas } from "./pages/PluginReas";
import { PostedReaEdit } from "./pages/PostedReaEdit";
import { EditPostedReas } from './pages/EditPostedReas';
import { NewReaEdit } from './pages/NewReaEdit';
import { GoogleOAuthProvider } from '@react-oauth/google';

const secret = import.meta.env.VITE_GOOGLE_SECRET;

const router = createBrowserRouter([
  {
    path : "/",
    element: <MainPage/>,
  },
  {
    path : '/explorer',
    element: <Explorer/>
  },
  {
    path : '/login',
    element: <Login/>,
  },
  {
    path : '/cadastro',
    element: <Cadastrar/>,
  },
  {
    path : '/addrea',
    element: <AddRea/>
  },
  {
    path: '/pluginreas',
    element: <PluginReas/>
  },
  {
    path: '/editpostedreas',
    element: <EditPostedReas/>
  },
  {
    path: '/reaeditadd',
    element: <NewReaEdit/>
  },
  {
    path: '/postedreaedit',
    element: <PostedReaEdit/>
  },
  {
    path: '/reaview/:id',
    element: <ReaView/>
  },
  {
    path: '/profile',
    element: <MeuPerfil/>
  },
  {
    path: '/redefinir',
    element: <Recover/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={secret}>
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>,
  </GoogleOAuthProvider>
)
