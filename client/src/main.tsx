import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {  Route, RouterProvider, createBrowserRouter , createRoutesFromElements } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Home from './pages/Home.tsx'
import { TooltipProvider } from '@radix-ui/react-tooltip'
import ProductIndivaul from './pages/ProductIndivaul.tsx'
import Otp from './pages/Otp.tsx'
import ProtectedRoute from './utils/ProtecteRoute.ts'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  >
       <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute> } />
       <Route path='/login' element={<Login />} />
       <Route path='/register' element={<Register />} />
       <Route path='/product/:id/' element={ <ProtectedRoute> <ProductIndivaul /> </ProtectedRoute> }/>
       <Route path='/otp' element={<Otp />} />
    </Route> 
  )
    
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
       <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  </React.StrictMode>,
)
