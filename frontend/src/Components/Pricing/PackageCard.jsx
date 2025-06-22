import React from 'react'
import classes from './Pricing.module.css'
const PackageCard = ({ pack, price ,popular }) => {
  return (
    <div className={popular ? `${classes.packageCard} ${classes.popular}` : classes.packageCard}>
        <h3 className={classes.packageTitle}>{pack}</h3>
        <p className={classes.packagePrice}>{price}</p>
        {popular && <span className={classes.popularBadge}>Most Popular</span>}
    </div>
  )
}

export default PackageCard
