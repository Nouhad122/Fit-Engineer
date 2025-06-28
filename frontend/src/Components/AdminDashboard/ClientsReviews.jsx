import React from 'react'
import classes from './ClientsReviews.module.css';

const ClientsReviews = ({clients, selectedClient, setSelectedClient, review, setReview, handleReviewSubmit, success}) => {
  return (
    <section className={classes.reviewSection}>
        <h2>Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className={classes.reviewForm}>
          <select
            value={selectedClient ? selectedClient.id || selectedClient._id : ''}
            onChange={e => {
              const user = clients.find(u => (u.id || u._id) === e.target.value);
              setSelectedClient(user);
            }}
            required
          >
            <option value="">Select a client</option>
            {clients.map(user => (
              <option key={user.id || user._id} value={user.id || user._id}>
                {user.fullName}
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
          <button type="submit" disabled={!selectedClient || !review.trim()}>
            Submit Review
          </button>
        </form>
        {success && <p className={classes.success}>{success}</p>}
      </section>
  )
}

export default ClientsReviews
