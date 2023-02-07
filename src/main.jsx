import React from 'react'
import ReactDOM from 'react-dom/client'
import { MainPage } from "./pages/MainPage"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import  {Login}  from './pages/Login'



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
    path : '/login',
    element: <Login/>,

  }

]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/> 
  </React.StrictMode>,
)
