import React from 'react';
import classes from './Pricing.module.css';
import PackageCard from './PackageCard';
import Title from '../Shared/Title';

const Pricing = () => {
  return (
    <section className={classes.pricingPackages} id='pricing'>
      <Title title="Packages & Pricing"/>
      <div className={classes.packagesGrid}>
        <PackageCard 
          pack='1 Plan' 
          price='$50'
          description='Choose one plan: Workout Plan OR Diet Plan'
        />
        <PackageCard 
          pack='2 Plans' 
          price='$70' 
          popular
          description='Workout Plan + Diet Plan'
        />
        <PackageCard 
          pack='Full Package 1' 
          price='$220'
          originalPrice='$300'
          description='Workout Plan + Diet Plan for 3 months'
          features={['Personalized workout plan', 'Customized diet plan', '3 months duration', 'One-time payment', 'Regular check-ins']}
        />
        <PackageCard 
          pack='Full Package 2' 
          price='$320'
          originalPrice='$450'
          description='Workout Plan + Diet Plan + Steroid Plan for 3 months'
          features={['Personalized workout plan', 'Customized diet plan', 'Advanced steroid plan', '3 months duration', 'One-time payment', 'Regular check-ins', 'Hormone monitoring']}
        />
      </div>
    </section>
  );
};

export default Pricing; 