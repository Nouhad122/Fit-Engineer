import React, { useEffect, useState } from 'react';
import classes from './AdminDashboard.module.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/clients'); // Adjust endpoint as needed
        const data = await res.json();
        setUsers(data.clients || []);
      } catch (err) {
        setError('Failed to fetch users.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser || !review.trim()) return;
    // Here you would send the review to your backend
    setSuccess(`Review for ${selectedUser.fullName} submitted!`);
    setReview('');
    setTimeout(() => setSuccess(null), 2000);
  };

  return (
    <div className={classes['admin-dashboard']}>
      {/* Section 1: User List */}
      <section className={classes.userSection}>
        <h2>Users</h2>
        {loading && <p>Loading users...</p>}
        {error && <p className={classes.error}>{error}</p>}
        <ul className={classes.userList}>
          {users.map((user) => (
            <li
              key={user.id || user._id}
              className={selectedUser && (selectedUser.id === user.id || selectedUser._id === user._id) ? classes.selected : ''}
              onClick={() => setSelectedUser(user)}
            >
              {user.fullName} ({user.email})
            </li>
          ))}
        </ul>
      </section>

      {/* Section 2: Review Input */}
      <section className={classes.reviewSection}>
        <h2>Write a Review</h2>
        <form onSubmit={handleReviewSubmit} className={classes.reviewForm}>
          <select
            value={selectedUser ? selectedUser.id || selectedUser._id : ''}
            onChange={e => {
              const user = users.find(u => (u.id || u._id) === e.target.value);
              setSelectedUser(user);
            }}
            required
          >
            <option value="">Select a user</option>
            {users.map(user => (
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
          <button type="submit" disabled={!selectedUser || !review.trim()}>
            Submit Review
          </button>
        </form>
        {success && <p className={classes.success}>{success}</p>}
      </section>
    </div>
  );
};

export default AdminDashboard;
