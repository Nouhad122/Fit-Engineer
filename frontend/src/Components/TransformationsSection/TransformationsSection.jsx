import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Pagination, Carousel, Typography, Spin, Empty } from 'antd';
import useHttp from '../../hooks/useHttp';
import classes from './TransformationsSection.module.css';
import SectionClientName from '../Shared/SectionClientName';
import ModalContext from '../../store/ModalContext';
import Modal from '../Shared/Modal';
import AdminContext from '../../store/AdminContext';
import Button from '../Shared/Button';
const { Text } = Typography;

const TransformationsSection = () => {
  const [transformations, setTransformations] = useState({ transformations: [], count: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const { openModal, openedModal } = useContext(ModalContext);
  const { getTransformations, deleteTransformation, error } = useHttp();
  const { isAdmin } = useContext(AdminContext);
  const pageSize = 6;
  useEffect(() => {
    fetchTransformations();
  }, []);

  const fetchTransformations = async () => {
    try {
      setLoading(true);
      const data = await getTransformations();
      setTransformations(data);
      setTotalPages(Math.ceil(data.count / pageSize));
    } catch (err) {
      console.error('Failed to fetch transformations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    if (currentPage > 1) {
      const section = document.getElementById('transformations');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [currentPage]);

  const getCurrentPageTransformations = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return transformations.transformations && transformations.transformations.length > 0 
      ? transformations.transformations.slice(startIndex, endIndex) 
      : [];
  };

  const currentTransformations = getCurrentPageTransformations();

  const handleDeleteTransformation = async (id) => {
    try {
      await deleteTransformation(id);
      await fetchTransformations();
      
      if (currentPage > 1 && currentTransformations.length === 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (err) {
      console.error('Error deleting transformation:', err);
    }
  };

  const handleDeleteClick = (id) =>{
    openModal({
      title: "Are you sure?",
      message: "Deleting this transformation will remove it from the system. This action cannot be undone.",
      onConfirm: () => handleDeleteTransformation(id)
    });
  }

  if (loading) {
    return (
      <section className={classes.transformationsSection}>
        <div className={classes.loadingContainer}>
          <Spin size="large" />
          <Text>Loading transformations...</Text>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.transformationsSection}>
        <div className={classes.errorContainer}>
          <Text type="danger">Error loading transformations: {error}</Text>
        </div>
      </section>
    );
  }

  if (!transformations.transformations || transformations.count === 0) {
    return (
      <section className={classes.transformationsSection}>
        <h2 className={classes.title}>Client Transformations</h2>
        <Empty 
         image={Empty.PRESENTED_IMAGE_SIMPLE} 
         description="No transformations available yet" 
         className={classes.emptyState}
        />
      </section>
    );
  }

  return (
    <>
    <section className={classes.transformationsSection} id="transformations">
      <h2 className={classes.title}>Client Transformations</h2>
      <p className={classes.subtitle}>Witness the incredible before and after results of my clients' fitness journeys</p>
      
      <Row gutter={[24, 24]} className={classes.transformationsGrid}>
        {currentTransformations.map((transformation, index) => (
          <Col xs={24} sm={12} lg={8} key={transformation._id || index}>
            <Card className={classes.transformationCard}>
              <SectionClientName sectionName={transformation} />
              <div className={classes.carouselContainer}>
                <Carousel 
                  autoplay={transformation.transformationImages.length > 1}
                  dots={{ position: 'bottom', className: classes.carouselDots }}
                  className={classes.carousel}
                  infinite={transformation.transformationImages.length > 1}
                >
                  {transformation.transformationImages.map((image, imgIndex) => (
                    <div key={imgIndex} className={classes.carouselItem}>
                      <img
                        src={`${import.meta.env.VITE_API_URL}${image}`}
                        alt={`Transformation ${index + 1} - Image ${imgIndex + 1}`}
                        className={classes.transformationImage}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <Text className={classes.transformationText}>
                  {transformation.transformationText}
                </Text>
              </div>
              {isAdmin && (
                  <Button 
                   className={classes.deleteButton}
                   onClick={() => handleDeleteClick(transformation.id)}
                   redBtn
                  >
                    Delete
                  </Button>
                )}
            </Card>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className={classes.paginationContainer}>
          <Pagination
            current={currentPage}
            total={transformations.count}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            className={classes.pagination}
          />
        </div>
      )}
    </section>
    {
      openedModal && <Modal />
    }
    </>
  );
};

export default TransformationsSection;
