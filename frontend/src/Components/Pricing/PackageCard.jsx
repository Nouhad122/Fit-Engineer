import React from 'react'
import classes from './Pricing.module.css'

const PackageCard = ({ pack, price, originalPrice, description, features, popular }) => {
  const hasDiscount = originalPrice && originalPrice !== price;
  const discountPercentage = hasDiscount 
    ? Math.round(((parseInt(originalPrice.replace('$', '')) - parseInt(price.replace('$', ''))) / parseInt(originalPrice.replace('$', ''))) * 100)
    : 0;

  return (
    <div className={popular ? `${classes.packageCard} ${classes.popular}` : classes.packageCard}>
      {popular && <span className={classes.popularBadge}>Most Popular</span>}
      {hasDiscount && <span className={classes.discountBadge}>{discountPercentage}% OFF</span>}
      
      <h3 className={classes.packageTitle}>{pack}</h3>
      
      <div className={classes.priceSection}>
        <p className={classes.packagePrice}>{price}</p>
        {hasDiscount && <p className={classes.originalPrice}>{originalPrice}</p>}
      </div>
      
      {description && <p className={classes.packageDescription}>{description}</p>}
      
      {features && (
        <ul className={classes.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={classes.feature}>
              <span className={classes.checkmark}>✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PackageCard
