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
import { Spin, Empty, Typography } from 'antd'
import SectionClientName from '../Shared/SectionClientName'

const { Text } = Typography;

const ReviewsSection = () => {
  const { isAdmin } = useContext(AdminContext);
  const { openModal, openedModal } = useContext(ModalContext);
  const { getReviews, deleteReview, loading, error } = useHttp();
  const [reviews, setReviews] = useState([]);

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
  }, []);


  const handleDeleteReview = async (id) =>{
    try{
      await deleteReview(id);
      const data = await getReviews();
      setReviews(data.reviews || []);
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

  if (loading) {
    return (
      <section className={classes.reviewsSection}>
        <div className={classes.container}>
          <h2 className={classes.title}>Client Reviews</h2>
          <div className={classes.loadingContainer}>
            <Spin size="large" />
            <Text>Loading reviews...</Text>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.reviewsSection}>
        <div className={classes.container}>
          <h2 className={classes.title}>Client Reviews</h2>
          <div className={classes.errorContainer}>
            <Text type="danger">Error loading reviews: {error}</Text>
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className={classes.reviewsSection}>
        <div className={classes.container}>
          <h2 className={classes.title}>Client Reviews</h2>
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No reviews available yet" 
            className={classes.emptyState}
          />
        </div>
      </section>
    );
  }

  return (
    <>
    <section className={classes.reviewsSection}>
      <div className={classes.container}>
        <h2 className={classes.title}>Client Reviews</h2>
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
          loop={reviews.length > 3}
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
                <SectionClientName sectionName={review} />
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
      </div>
    </section>
    {
      openedModal && <Modal />
    }
  </>
  )
}

export default ReviewsSection
