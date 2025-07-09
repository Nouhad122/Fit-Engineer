// Utility function to get authenticated headers
export const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };
  
  // Utility function to make authenticated API calls
  export const authenticatedFetch = async (url, options = {}) => {
    const headers = getAuthHeaders();
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      }
    });
  
      if (response.status === 401) {
    // Token is invalid or expired
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    // Dispatch custom event to notify AdminContext
    window.dispatchEvent(new Event('adminStatusChanged'));
    window.location.href = '/admin-login';
    throw new Error('Authentication failed');
  }
  
    return response;
  }; 