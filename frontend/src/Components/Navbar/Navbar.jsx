import React, { useState, useEffect } from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      {isMenuOpen && (
        <div className={classes.backdrop} onClick={closeMenu}></div>
      )}
      
      <nav className={classes.navbar}>
        <div className={classes.navContainer}>
          {/* Brand/Logo */}
          <div className={classes.brand}>
            <Link to="/" className={classes.logo}>FIT ENGINEER</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={classes.mobileMenuButton}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`${classes.hamburger} ${isMenuOpen ? classes.active : ''}`}></span>
          </button>

          {/* Navigation Links */}
              <div className={`${classes.navLinks} ${isMenuOpen ? classes.active : ''}`}>
                <Link to="/client-form" className={classes.navLink} onClick={closeMenu}>Client Form</Link>
                <a href="#offers" className={classes.navLink} onClick={closeMenu}>What I Offer</a>
                <a href="#who-am-i" className={classes.navLink} onClick={closeMenu}>Who Am I</a>
                <a href='#pricing' className={classes.navLink} onClick={closeMenu}>Pricing</a>
                <a href='#contact' className={classes.navLink} onClick={closeMenu}>Contact Me</a>
              </div>

          {/* Action Buttons */}
          <div className={`${classes.actionButtons} ${isMenuOpen ? classes.active : ''}`}>
            <Button className={classes.navbarButton}>Start Now</Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
