import React from "react";
import ReactDOM from "react-dom/client";
import { MainPage } from "./pages/MainPage";
import { Explorer } from "./pages/Explorer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AddRea } from "./pages/AddRea";
import { ReaView } from "./pages/ReaView";
import { Recover } from "./components/login/Recover";
import { MeuPerfil } from "./pages/MeuPerfil";
import { PluginReas } from "./pages/PluginReas";
import { PostedReaEdit } from "./pages/PostedReaEdit";
import { EditPostedReas } from "./pages/EditPostedReas";
import { NewReaEdit } from "./pages/NewReaEdit";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HelpPage } from "./pages/HelpPage";

const secret = import.meta.env.VITE_GOOGLE_SECRET;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/explorer",
    element: <Explorer />,
  },
  /*{
    path : '/login',
    element: <Login/>, // TODO: Rota morta
  },
  {
    path : '/cadastro',
    element: <Login/>, // TODO: Rota morta
  },*/
  {
    path: "/addrea",
    element: <AddRea />,
  },
  {
    path: "/pluginreas",
    element: <PluginReas />,
  },
  {
    path: "/editpostedreas",
    element: <EditPostedReas />,
  },
  {
    path: "/reaeditadd",
    element: <NewReaEdit />, // http://localhost:5173/reaeditadd
  },
  {
    path: "/reaeditadd/:index", //  http://localhost:5173/reaeditadd/algum-indice
    element: <NewReaEdit />,
  },
  {
    path: "/postedreaedit/:id",
    element: <PostedReaEdit />,
  },
  {
    path: "/reaview/:id",
    element: <ReaView />,
  },
  {
    path: "/reaview/:id/:comments",
    element: <ReaView />,
  },
  {
    path: "/profile",
    element: <MeuPerfil />,
  },
  {
    path: "/redefinir",
    element: <Recover />,
  },
  {
    path: "/help",
    element: <HelpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={secret}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
