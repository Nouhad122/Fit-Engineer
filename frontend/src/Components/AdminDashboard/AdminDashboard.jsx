import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminDashboard.module.css';
import ClientsData from './ClientsData';
import ClientsReviews from './ClientsReviews';
import Button from '../Shared/Button';
import { authenticatedFetch } from '../../utils/api';
import AdminContext from '../../store/AdminContext';

const AdminDashboard = () => {
  const { logoutAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
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
        const res = await authenticatedFetch('http://localhost:3000/api/clients-forms');
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

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin-login');
  };

  return (
    <div className={classes['admin-dashboard']}>
      <div className={classes.header}>
        <h1>Admin Dashboard</h1>
        <Button onClick={handleLogout} redBtn>
          Logout
        </Button>
      </div>
      
      <div className={classes['dashboard-content']}>
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
    </div>
  );
};

export default AdminDashboard;
