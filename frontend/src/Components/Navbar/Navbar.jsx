import React, { useState, useEffect, useContext } from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import Button from '../Shared/Button';
import AdminContext from '../../store/AdminContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAdmin, logoutAdmin } = useContext(AdminContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
 
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

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

  const handleLogout = () =>{
    logoutAdmin();
    navigate('/');
  }

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

          {
            location.pathname !== import.meta.env.VITE_LOGIN_URL && location.pathname !== '/client-form' &&(
              <>
              {/* Mobile Menu Button */}
              <button 
                className={classes.mobileMenuButton}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span className={`${classes.hamburger} ${isMenuOpen ? classes.active : ''}`}></span>
              </button>

              <div className={`${classes.navLinks} ${isMenuOpen ? classes.active : ''}`}>
                {
                  location.pathname === '/' && (
                    <>
                    <Link to="/client-form" className={classes.navLink} onClick={closeMenu}>Client Form</Link>
                    <a href="#offers" className={classes.navLink} onClick={closeMenu}>What I Offer</a>
                    <a href="#who-am-i" className={classes.navLink} onClick={closeMenu}>Who Am I</a>
                    <a href='#pricing' className={classes.navLink} onClick={closeMenu}>Pricing</a>
                    <a href='#contact' className={classes.navLink} onClick={closeMenu}>Contact Me</a>
                    </>
                  )
                }
                {
                  isAdmin && (
                    <Link to="/admin-dashboard" className={classes.navLink} onClick={closeMenu}>Admin Dashboard</Link>
                  )
                }
              </div>

          <div className={`${classes.actionButtons} ${isMenuOpen ? classes.active : ''}`}>
            {
              location.pathname !== '/client-form' && (
                <Button className={classes.navbarButton} path='/client-form' isLink>Start Now</Button>
              )
            }
            {
                  isAdmin && (
                    <Button className={classes.logoutButton} onClick={handleLogout}>Logout</Button>
                  )
                }
          </div>
          </>
            )
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;
