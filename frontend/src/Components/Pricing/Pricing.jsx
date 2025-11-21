import React from 'react';
import classes from './Pricing.module.css';
import PackageCard from './PackageCard';
import Title from '../Shared/Title';

const Pricing = () => {
  return (
    <section className={classes.pricingPackages} id='pricing'>
      <Title title="Packages & Pricing"/>
      <div className={classes.packagesGrid}>
        {/* Individual Plans */}
        <PackageCard 
          pack='1 Month Workout Plan' 
          price='$70'
          tier='Standard'
          description='Professional workout plan tailored to your goals'
          contactFrequency='Weekly check-ins'
        />
        <PackageCard 
          pack='1 Month Diet Plan' 
          price='$70'
          tier='Standard'
          description='Customized nutrition plan for optimal results'
          contactFrequency='Weekly check-ins'
        />

        {/* Full Package 1 - Workout + Diet */}
        <PackageCard 
          pack='Full Package 1' 
          price='$300'
          tier='Standard'
          description='3 months workout plan + diet plan'
          contactFrequency='Weekly check-ins'
          features={[
            'Personalized 3-month workout plan',
            'Customized 3-month diet plan',
            'One-time payment',
            'Weekly progress check-ins',
            'Plan adjustments as needed'
          ]}
        />
        <PackageCard 
          pack='Full Package 2' 
          price='$500'
          tier='Premium'
          description='3 months workout plan + diet plan'
          contactFrequency='Daily coaching support'
          features={[
            'Personalized 3-month workout plan',
            'Customized 3-month diet plan',
            'Daily check-ins & support',
            'Instant response to questions',
            'Real-time plan adjustments',
            'Priority support'
          ]}
          popular
        />

      </div>
    </section>
  );
};

export default Pricing; 