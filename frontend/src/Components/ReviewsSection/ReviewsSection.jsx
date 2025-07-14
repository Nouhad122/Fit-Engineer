import React, { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import classes from './ReviewsSection.module.css'
import Button from '../Shared/Button'
import useHttp from '../../hooks/useHttp'
import ModalContext from '../../store/ModalContext'
import Modal from '../Shared/Modal'
import AdminContext from '../../store/AdminContext'
import Loading from '../Shared/Loading'
const ReviewsSection = ({ reviews: propReviews, loading: propLoading, error: propError }) => {
  const { isAdmin } = useContext(AdminContext);
  const { openModal, openedModal } = useContext(ModalContext);
  const { getReviews, deleteReview, loading: hookLoading, error: hookError } = useHttp();
  const [reviews, setReviews] = useState(propReviews || []);
  
  // Use props if provided, otherwise use hook state
  const displayReviews = propReviews || reviews;
  const displayLoading = propLoading !== undefined ? propLoading : hookLoading;
  const displayError = propError !== undefined ? propError : hookError;
  useEffect(() =>{
    // Only fetch if no props are provided
    if (!propReviews) {
      const fetchReviews = async () =>{
        try{
          const data = await getReviews();
          setReviews(data.reviews || []);
        }
        catch(err){
          // Error is handled by useHttp hook
        }
      }
      
      fetchReviews();
      
      // Listen for reviews updates when not using props
      const handleReviewsUpdate = () => {
        fetchReviews();
      };
      
      window.addEventListener('reviewsUpdated', handleReviewsUpdate);
      
      return () => {
        window.removeEventListener('reviewsUpdated', handleReviewsUpdate);
      };
    }
  }, [getReviews, propReviews]);

  const handleDeleteReview = async (id) =>{
    try{
      await deleteReview(id);
      // Refresh reviews after deletion
      const data = await getReviews();
      setReviews(data.reviews || []);
      // Trigger reviews refresh across the app
      window.dispatchEvent(new Event('reviewsUpdated'));
    }
    catch(err){
      // Error is handled by useHttp hook
    }
  }

  const handleDeleteClick = (id) =>{
    openModal({
      title: "Are you sure?",
      message: "Deleting this review will remove it from the system. This action cannot be undone.",
      onConfirm: () => handleDeleteReview(id)
    });
  }

  return (
    <>
    <section className={classes.reviewsSection}>
      <div className={classes.container}>
        <h2 className={classes.title}>Client Reviews</h2>
        {displayLoading ? <Loading message="Loading reviews..." /> :
        displayError ? <div className={classes.error}>Error: {displayError}</div> :
        displayReviews.length === 0 ? <div className={classes.noReviews}>No reviews found</div> :
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
          {displayReviews.map((review) => (
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
                {isAdmin && (
                  <Button onClick={() => handleDeleteClick(review.id)} redBtn>Delete</Button>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </>
      }
          
      </div>
    </section>
    {
      openedModal && <Modal />
    }
  </>
  )
}

export default ReviewsSection
