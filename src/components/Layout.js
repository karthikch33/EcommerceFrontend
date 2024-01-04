import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bulb from '../pages/Bulb';
const Layout = () => {
  return (
    <>
    <Header/>
    <ToastContainer
            position='top-right'
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />  
     <div className='dark jumbo relative flex flex-col h-[100vh] items-center justify-center bg-white dark:bg-transparent transition-bg'>
        <div className="absolute inset-0 overflow-hidden">
          <div className="jumbo absolute -inset-[10px] opacity-50"></div>
        </div>
        <div className="mt-4">
        <Bulb/>
            <Outlet/>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default Layout