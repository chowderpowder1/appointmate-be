import React from 'react'
import {Outlet} from 'react-router'
import Navbar from '../components/Ui/Navbar'
import Footer from '../components/ClinicWebsite/Footer'
import { ScrollProvider } from '../features/scrollContext'

const MainLayout = () => {
  return (
   <>
      <Navbar />
      <Outlet/>
      <Footer/>
   </>
  )
}

export default MainLayout
