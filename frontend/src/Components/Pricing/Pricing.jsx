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
          description='Choose one plan: Workout Plan, Diet Plan, or Steroid Plan'
        />
        <PackageCard 
          pack='3 Plans' 
          price='$130' 
          originalPrice='$150'
          description='Workout Plan + Diet Plan + Steroid Plan'
        />
        <PackageCard 
          pack='Full Package 1' 
          price='$230'
          originalPrice='$300'
          description='Any 2 plans for 3 months'
          features={[
            'Choose any 2 plans',
            '3 months duration',
            'One-time payment',
            'Regular check-ins'
          ]}
          popular
        />
        <PackageCard 
          pack='Full Package 2' 
          price='$360'
          originalPrice='$450'
          description='Workout Plan + Diet Plan + Steroid Plan for 3 months'
          features={['Personalized workout plan', 'Customized diet plan', 'Advanced steroid plan', '3 months duration', 'One-time payment', 'Regular check-ins', 'Hormone monitoring']}
        />
      </div>
    </section>
  );
};

export default Pricing; 