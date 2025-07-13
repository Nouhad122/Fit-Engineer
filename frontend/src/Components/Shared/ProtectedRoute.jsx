import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';
import Loading from './Loading';

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
        navigate('*');
        return;
      }

      try {
        await verifyToken();
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired - handled by useHttp
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('*');
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [navigate, verifyToken]);

  if (isLoading) {
    return <Loading message="Verifying authentication..." />;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute; 