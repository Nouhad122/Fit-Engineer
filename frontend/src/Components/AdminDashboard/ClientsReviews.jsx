import React, { useContext} from 'react'
import classes from './ClientsReviews.module.css';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';
import AdminContext from '../../store/AdminContext';
import useHttp from '../../hooks/useHttp';

const ClientsReviews = ({clients, selectedClient, setSelectedClient, review, setReview, handleReviewSubmit, success}) => {
  const { openedModal, openModal } = useContext(ModalContext);
  const { refreshReviews } = useContext(AdminContext);
  const { createReviewAuthenticated } = useHttp();
  
  const handleCreateReview = async () =>{
    try {
      await createReviewAuthenticated({clientName: selectedClient.fullName, reviewText: review});
      alert('Review created successfully');
      setReview('');
      setSelectedClient(null);
      // Trigger reviews refresh across the app
      refreshReviews();
    } catch (err) {
      alert('Failed to create review');
    }
  }
  return (
    <>
    <section className={classes.reviewSection}>
        <h2>Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className={classes.reviewForm}>
          <select
            value={selectedClient ? selectedClient.id : ''}
            onChange={e => {
              const client = clients.find(client => client.id === e.target.value);
              setSelectedClient(client);
            }}
            required
          >
            <option value="">Select a client</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.fullName}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Write your review here..."
            value={review}
            onChange={e => setReview(e.target.value)}
            rows={3}
            required
          />
          <button type="button" disabled={!selectedClient || !review.trim()} onClick={() => openModal({
            title: "Submit Review",
            message: `Are you sure you want to submit a review for ${selectedClient?.fullName}?`,
            onConfirm: handleCreateReview
          })}>
            Submit Review
          </button>
        </form>
        {success && <p className={classes.success}>{success}</p>}
      </section>
      {
        openedModal && <Modal />
      }
      </>
  )
}

export default ClientsReviews
