import React from 'react'
import Carousel from '../Components/Carousel/Carousel'
import Offers from '../Components/Offers/Offers'
import Pricing from '../Components/Pricing/Pricing'
import Support from '../Components/Support/Support'
import PaymentMethods from '../Components/PaymentMethods/PaymentMethods'

const Home = () => {
  return (
    <>
      <Carousel />
      <Offers />
      <Pricing />
      <PaymentMethods />
      <Support />
    </>
  )
}

export default Home
