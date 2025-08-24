import { useState, useCallback } from 'react';
import { authenticatedFetch } from '../utils/api';

const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRequestPermission = async (url, options = {}, fetchFunction) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetchFunction(url, {
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {})
        },
        ...options
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Handle validation errors from express-validator
        if (response.status === 400 && errorData.errors && Array.isArray(errorData.errors)) {
          const errorMessage = errorData.errors.join(', ');
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // Handle other errors
        const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      if (!err.message.includes('HTTP error') && !err.message.includes('Validation failed')) {
        setError(err.message || 'Something went wrong!');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Generic request function
  const sendRequest = useCallback(async (url, options = {}) => {
    return await handleRequestPermission(url, options, fetch);
  }, []);

  // Authenticated request function
  const sendAuthenticatedRequest = useCallback(async (url, options = {}) => {
    return await handleRequestPermission(url, options, authenticatedFetch);
  }, []);


  // Client operations
  const getClients = useCallback(async () => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + '/api/clients-forms');
  }, [sendAuthenticatedRequest]);

  const getClientById = useCallback(async (id) => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + `/api/clients-forms/${id}`);
  }, [sendAuthenticatedRequest]);

  const createClient = useCallback(async (clientData) => {
    return await sendRequest(import.meta.env.VITE_API_URL + '/api/clients-forms', {
      method: 'POST',
      body: JSON.stringify(clientData)
    });
  }, [sendRequest]);

  const deleteClient = useCallback(async (id) => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + `/api/clients-forms/${id}`, {
      method: 'DELETE'
    });
  }, [sendAuthenticatedRequest]);


  // Review operations
  const getReviews = useCallback(async () => {
    return await sendRequest(import.meta.env.VITE_API_URL + '/api/reviews');
  }, [sendRequest]);

  const createReview = useCallback(async (reviewData) => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + '/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  }, [sendAuthenticatedRequest]);

  const deleteReview = useCallback(async (id) => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + `/api/reviews/${id}`, {
      method: 'DELETE'
    });
  }, [sendAuthenticatedRequest]);


  //Transformation operations
  const getTransformations = useCallback(async () => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + '/api/transformations');
  }, [sendAuthenticatedRequest]);

  const createTransformation = useCallback(async (transformationData) =>{
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + '/api/transformations',{
      method: 'POST',
      body: JSON.stringify(transformationData)
    });
  },[sendAuthenticatedRequest]);

  const deleteTransformation = useCallback(async (id) => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + `/api/transformations/${id}`, {
      method: 'DELETE'
    });
  },[sendAuthenticatedRequest]);

  // Image upload operations
  const uploadImages = useCallback(async (formData) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(import.meta.env.VITE_API_URL + '/api/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  }, []);

  // Authentication operations
  const login = useCallback(async (credentials) => {
    return await sendRequest(import.meta.env.VITE_API_URL + '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }, [sendRequest]);

  const verifyToken = useCallback(async () => {
    return await sendAuthenticatedRequest(import.meta.env.VITE_API_URL + '/api/auth/verify');
  }, [sendAuthenticatedRequest]);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    
    // Generic methods
    sendRequest,
    sendAuthenticatedRequest,
    
    // Client methods
    getClients,
    getClientById,
    createClient,
    deleteClient,
    
    // Review methods
    getReviews,
    createReview,
    deleteReview,
    
    // Transformation methods
    getTransformations,
    createTransformation,
    deleteTransformation,
    
    // Image upload methods
    uploadImages,
    
    // Auth methods
    login,
    verifyToken
  };
};

export default useHttp; 