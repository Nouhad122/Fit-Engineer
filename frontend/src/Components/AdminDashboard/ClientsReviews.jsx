import React, { useContext, useState } from 'react'
import classes from './Clients.module.css';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';
import AdminContext from '../../store/AdminContext';
import useHttp from '../../hooks/useHttp';
import SelectableClients from './SelectableClients.jsx';

const ClientsReviews = ({clients, selectedClient, setSelectedClient}) => {
  const { openedModal, openModal } = useContext(ModalContext);
  const { refreshReviews } = useContext(AdminContext);
  const { createReviewAuthenticated } = useHttp();
  const [review, setReview] = useState('');
  const [message, setMessage] = useState({text: '', type: ''});

  const handleReviewSubmit = (e) => {
    e.preventDefault();
  };
  
  const handleCreateReview = async () =>{
    try {
      if(review.length < 10){ 
        setMessage({text: 'Review must be at least 10 characters long.', type: 'error'});
        return;
      }
      await createReviewAuthenticated({
        clientName: selectedClient.fullName, 
        reviewText: review,
      });
      setMessage({text: 'Review created successfully!', type: 'success'});
      setReview('');
      setSelectedClient(null);
      refreshReviews();
    } catch (err) {
      setMessage({text: 'Failed to create review. Please try again.', type: 'error'});
    }
  }
  return (
    <>
    <section className={classes.adminSection}>
        <h2>Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className={classes.adminForm}>
          <SelectableClients 
            clients={clients}
            selectedClient={selectedClient}
            setSelectedClient={setSelectedClient}
          />

          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={e => setReview(e.target.value)}
            rows={3}
            required
          />

          <button type="button"
           className={classes.submitBtn}
           disabled={!selectedClient || !review.trim()}
           onClick={() => openModal({
            title: "Submit Review",
            message: `Are you sure you want to submit a review for ${selectedClient?.fullName}?`,
            onConfirm: handleCreateReview
          })}>
            Submit Review
          </button>
        </form>

        {message.text && <p className={`${classes.message} ${classes[message.type]}`}>{message.text}</p>}
      </section>
      {
        openedModal && <Modal />
      }
      </>
  )
}

export default ClientsReviews
