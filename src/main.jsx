import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainPage } from "./pages/MainPage"
import { Explorer } from "./pages/Explorer"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './pages/Login'
import { Cadastrar } from './pages/Cadastrar'
import { AddRecurso } from './pages/AddRecurso'
import { ReaView } from './pages/ReaView'

const router = createBrowserRouter([
  {
    path : "/",
    element: <MainPage/>,
    // errorElement: <ErrorPage/>,
    // children: [
    //   {
    //     path: "contacts/:contactId",
    //     element: <Contact/>,
    //   },
      
    // ]
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
    path : '/add',
    element: <AddRecurso/>
  },
  {
    path: '/reaview',
    element: <ReaView/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>,
)
