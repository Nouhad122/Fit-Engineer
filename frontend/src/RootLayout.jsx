import React, { useEffect } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

// Component that automatically scrolls to top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default RootLayout
