import React, { useEffect, useState } from 'react';
import classes from './AdminDashboard.module.css';
import ClientsData from './ClientsData';
import ClientsReviews from './ClientsReviews';

const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:3000/api/clients-forms');
        const data = await res.json();
        setClients(data.clients || []);
      } catch (err) {
        setError('Failed to fetch clients.');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() =>{
      fetchClients();
    }, []);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedClient || !review.trim()) return;
    setSuccess(`Review for ${selectedClient.fullName} submitted!`);
    setReview('');
    setTimeout(() => setSuccess(null), 2000);
  };

  return (
    <div className={classes['admin-dashboard']}>
      <ClientsData
        clients={clients} 
        loading={loading}
        error={error}
        onClientDeleted={fetchClients}
      />

      <ClientsReviews
        clients={clients}
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
        review={review}
        setReview={setReview}
        success={success}
        handleReviewSubmit={handleReviewSubmit}
      />
    </div>
  );
};

export default AdminDashboard;
