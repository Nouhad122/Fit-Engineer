import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AdminDashboard.module.css';
import ClientsData from './ClientsData';
import ClientsReviews from './ClientsReviews';
import Button from '../Shared/Button';
import useHttp from '../../hooks/useHttp';
import AdminContext from '../../store/AdminContext';
import ClientsTransformation from './ClientsTransformation';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { getClients, loading, error } = useHttp();
  const [clients, setClients] = useState([]);
  const [selectedClientForReviews, setSelectedClientForReviews] = useState(null);
  const [selectedClientForTransformations, setSelectedClientForTransformations] = useState(null);

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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.dispatchEvent(new Event('adminStatusChanged'));
    navigate('/');
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
          selectedClient={selectedClientForReviews}
          setSelectedClient={setSelectedClientForReviews}
        />

        <ClientsTransformation 
          clients={clients}
          selectedClient={selectedClientForTransformations}
          setSelectedClient={setSelectedClientForTransformations}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
