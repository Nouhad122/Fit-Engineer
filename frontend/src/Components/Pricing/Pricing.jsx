import React from 'react';
import classes from './Pricing.module.css';
import PackageCard from './PackageCard';
import Title from '../Shared/Title';

const Pricing = () => {
  return (
    <section className={classes.pricingPackages} id='pricing'>
      <Title title="Packages & Pricing"/>
      <div className={classes.packagesGrid}>
        <PackageCard pack='1 Plan' price='$50'/>
        <PackageCard pack='2 Plans' price='$70' popular/>
        <PackageCard pack='Full Package' price='$100'/>
      </div>
    </section>
  );
};

export default Pricing; 