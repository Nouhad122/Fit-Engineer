import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { verifyToken } = useHttp();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsLoading(false);
        navigate('/admin-login');
        return;
      }

      try {
        await verifyToken();
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired - handled by useHttp
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin-login');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate, verifyToken]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Verifying authentication...
      </div>
    );
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute; 