import React, { useEffect, useRef } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Components/Footer/Footer'

// Component that automatically scrolls to top on route changes
const ScrollToTop = () => {
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevPathRef.current = location.pathname;
    }
  }, [location.pathname]);

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
