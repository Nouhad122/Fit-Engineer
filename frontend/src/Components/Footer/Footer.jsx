import React from 'react'
import classes from './Footer.module.css'
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={classes.footer}>
        <div className={classes.footerContent}>
            <h2>Fit Engineer</h2>
            <p>Your journey to a healthier, stronger you starts here.</p>
            <div className={classes.socialLinks}>
                <a href="https://www.facebook.com/fitengineer" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
                <a href="https://www.instagram.com/fitengineer" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://wa.me/201020202020" target='_blank' rel='noopener noreferrer'>
                    <FaWhatsapp />
                </a>
            </div>
            <div className={classes.creator}>
                <h1>Created by <a href="https://wa.me/+905344421873" target='_blank' rel='noopener noreferrer'>Nouhad El Hallab</a></h1>
            </div>
        </div>
    </footer>
  )
}

export default Footer