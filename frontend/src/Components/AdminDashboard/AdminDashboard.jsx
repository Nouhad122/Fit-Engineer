import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminDashboard.module.css';
import ClientsData from './ClientsData';
import ClientsReviews from './ClientsReviews';
import Button from '../Shared/Button';
import useHttp from '../../hooks/useHttp';
import AdminContext from '../../store/AdminContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { updateAdminStatus } = useContext(AdminContext);
  const { getClients, loading, error } = useHttp();
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [review, setReview] = useState('');
  const [success, setSuccess] = useState(null);

    const fetchClients = async () => {
      try {
        const data = await getClients();
        setClients(data.clients || []);
      } catch (err) {
        // Error is handled by useHttp hook
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
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    // Dispatch custom event to notify AdminContext
    window.dispatchEvent(new Event('adminStatusChanged'));
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
