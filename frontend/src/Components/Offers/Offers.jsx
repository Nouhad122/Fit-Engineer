import React from 'react';
import classes from './Offers.module.css';
import Title from '../Shared/Title';
import OfferCard from './OfferCard';
import offersData from './Offers.json';

const Offers = () => {
  return (
    <section className={classes.offersSection} id="offers">
      <div className={classes.container}>
        <Title title="What I Offer"/>
        <div className={classes.offersGrid}>
          {offersData.map(offer => (
            <OfferCard
              key={offer.id}
              cardTitle={offer.cardTitle}
              featuresList={offer.featuresList}
              planType={offer.planType}
              icon={offer.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Offers;
