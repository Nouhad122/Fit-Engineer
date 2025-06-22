import React from 'react'
import classes from './Carousel.module.css'
import mostafaImg from '../../assets/mostafa-1.png'
import Button from '../Shared/Button'
const Carousel = () => {
  return (
    <div className={classes.carousel}>
      <div className={classes.backdrop}></div>
      <img src={mostafaImg} alt='mostafa image'/>
      <div className={classes['carousel__text']}>
        <h2>Mostafa’s Online Coaching</h2>
        <p>
            Transform your body with fully personalized, online coaching tailored to your goals.
            Whether you want to lose fat, build muscle, recover from injury, or safely use performance enhancers,
            I’m here to guide you every step of the way.
        </p>
        <Button className={classes.carouselButton}>Start Now</Button>
      </div>
      
    </div>
  )
}

export default Carousel
