import React from 'react'
import classes from './WhosMostafa.module.css'

const WhosMostafa = () => {
  return (
    <section className={classes.whosMostafa}>
        <h2 className={classes.title}>Who's Mostafa?</h2>
      <div className={classes.container}>
        <div className={classes.imageSection}>
          <img 
            src="/src/assets/mostafa-2.jpeg" 
            alt="Mostafa - Professional Gym Coach" 
            className={classes.coachImage}
          />
        </div>
        
        <div className={classes.contentSection}>
          <p className={classes.intro}>
            Meet Mostafa, your dedicated personal trainer and fitness transformation specialist. 
            With years of experience in bodybuilding and fitness coaching, Mostafa has helped 
            countless individuals achieve their fitness goals and transform their lives.
          </p>
          
          <div className={classes.achievements}>
            <h3 className={classes.achievementsTitle}>🏆 Achievements</h3>
            <ul className={classes.achievementsList}>
              <li>Top 1 men's physique north lebanon 2022</li>
              <li>Top 1 MR UNIVERSE men's physique 2024</li>
              <li>Top 1 MR UNIVERSE men's physique 2025</li>
            </ul>
          </div>
          
          <div className={classes.expertise}>
            <h3 className={classes.expertiseTitle}>💪 Expertise</h3>
            <ul className={classes.expertiseList}>
              <li>Lifestyle & Stage Prep Nutrition Expert</li>
              <li>Design training plans made just for your body and goal</li>
              <li>Advanced Hormone Coach</li>
            </ul>
          </div>
          
          <p className={classes.mission}>
            Mostafa's mission is to provide personalized training and nutrition plans that are 
            specifically designed for your unique body type, goals, and lifestyle. Whether you're 
            looking to build muscle, lose fat, or prepare for competition, Mostafa has the expertise 
            to guide you every step of the way.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhosMostafa
