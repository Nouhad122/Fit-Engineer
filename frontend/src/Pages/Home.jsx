import React, { useEffect, useState } from 'react'
import Carousel from '../Components/Carousel/Carousel'
import Offers from '../Components/Offers/Offers'
import Pricing from '../Components/Pricing/Pricing'
import Support from '../Components/Support/Support'
import PaymentMethods from '../Components/PaymentMethods/PaymentMethods'
import WhosMostafa from '../Components/WhosMostafa/WhosMostafa'
import ReviewsSection from '../Components/ReviewsSection/ReviewsSection'
import useHttp from '../hooks/useHttp'

const Home = () => {
  const { getReviews, loading, error } = useHttp();
  const [reviews, setReviews] = useState([]);
  console.log(import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews();
        setReviews(data.reviews || []);
      } catch (err) {
        // Error is handled by useHttp hook
      }
    };
    
    fetchReviews();
    
    // Listen for reviews updates
    const handleReviewsUpdate = () => {
      fetchReviews();
    };
    
    window.addEventListener('reviewsUpdated', handleReviewsUpdate);
    
    return () => {
      window.removeEventListener('reviewsUpdated', handleReviewsUpdate);
    };
  }, [getReviews]);

  return (
    <>
      <Carousel />
      <Offers />
      <WhosMostafa />
      <Pricing />
      <ReviewsSection reviews={reviews} loading={loading} error={error} />
      <PaymentMethods />
      <Support />
    </>
  )
}

export default Home
