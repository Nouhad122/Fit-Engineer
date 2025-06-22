import React from 'react';
import classes from './Offers.module.css';
import { FaAppleAlt, FaDumbbell, FaSyringe } from 'react-icons/fa';

const icons = {
  FaAppleAlt: <FaAppleAlt className={classes.icon} />,
  FaDumbbell: <FaDumbbell className={classes.icon} />,
  FaSyringe: <FaSyringe className={classes.icon} />
};

const OfferCard = ({ cardTitle, price, featuresList, planType, icon }) => {
  return (
    <div className={`${classes.offerCard} ${classes[planType]}`}>
      <div className={classes.iconContainer}>
        {icons[icon]}
      </div>
      <h3 className={classes.cardTitle}>{cardTitle}</h3>
      <p className={classes.price}>{price}</p>
      <ul className={classes.featuresList}>
        {featuresList.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  );
};

export default OfferCard;
