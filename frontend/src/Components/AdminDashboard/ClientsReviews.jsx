import React, { useContext} from 'react'
import classes from './ClientsReviews.module.css';
import Modal from '../Shared/Modal';
import ModalContext from '../../store/ModalContext.jsx';

const ClientsReviews = ({clients, selectedClient, setSelectedClient, review, setReview, handleReviewSubmit, success}) => {
  const { openedModal, openModal } = useContext(ModalContext);
  const handleCreateReview = async () =>{
    const res = await fetch(`http://localhost:3000/api/reviews`, {
      method: 'POST',
      body: JSON.stringify({clientName: selectedClient.fullName, reviewText: review}),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if(res.ok){
      alert('Review created successfully');
      setReview('');
      setSelectedClient(null);
    }
    else{
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
