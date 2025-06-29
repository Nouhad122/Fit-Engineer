import React from 'react'
import classes from './ClientDetails.module.css'

const InfoCard = ({ title, icon, fields }) => {
  return (
    <div className={classes.section}>
        <h2 className={classes.sectionTitle}>
        <span className={classes.sectionIcon}>{icon}</span>
        {title}
        </h2>
        <div className={classes.fieldsGrid}>
            {
              fields.map(field =>(
                field
              ))
            }
        </div>
    </div>
  )
}

export default InfoCard
