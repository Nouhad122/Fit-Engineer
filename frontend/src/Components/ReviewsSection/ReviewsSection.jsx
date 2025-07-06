import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import classes from './ReviewsSection.module.css'

const ReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() =>{
    const fetchReviews = async () =>{
      try{
        const response = await fetch('http://localhost:3000/api/reviews');
        if(!response.ok){
        setError('Failed to fetch reviews');          
        }
        const data = await response.json();
        setReviews(data.reviews || []);

      }
      catch(err){
        setError('Failed to fetch reviews');
      }
      finally{
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  if(loading){
    return <div>Loading...</div>;
  }
  if(error){
    return <div>Error: {error}</div>;
  }

  return (
    <section className={classes.reviewsSection}>
      <div className={classes.container}>
        <h2 className={classes.title}>Client Reviews</h2>
        {reviews.length === 0 ?
         <div className={classes.noReviews}>No reviews found</div>
        :
          <>
             <p className={classes.subtitle}>What my clients say about their transformation journey</p>
        
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              dynamicBullets: true
            }}
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
            }}
            className={classes.swiper}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className={classes.slide}>
                <div className={classes.reviewCard}>
                  <div className={classes.reviewHeader}>
                    <div className={classes.avatar}>
                      {review.clientName.charAt(0)}
                    </div>
                    <h3 className={classes.clientName}>{review.clientName}</h3>
                  </div>
                  <div className={classes.reviewContent}>
                    <p className={classes.reviewText}>"{review.reviewText}"</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          </>
          
        }
      </div>
    </section>
  )
}

export default ReviewsSection
