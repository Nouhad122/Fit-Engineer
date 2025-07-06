import React from 'react'
import classes from './Support.module.css'
import { FaWhatsapp } from 'react-icons/fa';
import Title from '../Shared/Title';

const Support = () => {
  return (
    <section className={classes.supportSection} id='contact'>
        <FaWhatsapp className={classes.supportIcon} />
        <Title title="24/7 Support via WhatsApp"/>
        <p className={classes.supportText}>Get direct, fast support anytime you need it.</p>
        <a href="https://wa.me/+96171813120" className={classes.whatsappButton} target="_blank" rel="noopener noreferrer">
        WhatsApp: +961 71 813 120
        </a>
  </section>
  )
}

export default Support
