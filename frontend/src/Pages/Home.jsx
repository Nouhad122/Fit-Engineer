import React from 'react'
import Carousel from '../Components/Carousel/Carousel'
import Offers from '../Components/Offers/Offers'
import Pricing from '../Components/Pricing/Pricing'
import Support from '../Components/Support/Support'
import PaymentMethods from '../Components/PaymentMethods/PaymentMethods'
import WhosMostafa from '../Components/WhosMostafa/WhosMostafa'
import ReviewsSection from '../Components/ReviewsSection/ReviewsSection'
import TransformtationsSection from '../Components/TransformationsSection/TransformationsSection'

const Home = () => {

  return (
    <>
      <Carousel />
      <Offers />
      <WhosMostafa />
      <Pricing />
      <ReviewsSection />
      <TransformtationsSection />
      <PaymentMethods />
      <Support />
    </>
  )
}

export default Home
