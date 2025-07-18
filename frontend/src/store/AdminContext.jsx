import React, { createContext, useState, useEffect } from 'react'

const AdminContext = createContext({
    isAdmin: false,
    updateAdminStatus: () => {},
    logoutAdmin: () => {},
    refreshReviews: () => {}
});

export const AdminContextProvider = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    
    const updateAdminStatus = () => {
        const adminToken = localStorage.getItem('adminToken');
        setIsAdmin(!!adminToken);
    };

    const logoutAdmin = () =>{
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        window.dispatchEvent(new Event('adminStatusChanged'));
    }

    const refreshReviews = () => {
        window.dispatchEvent(new Event('reviewsUpdated'));
    }
    
    useEffect(() => {
        updateAdminStatus();
        
        // Listen for custom admin status change events
        const handleAdminStatusChange = () => {
            updateAdminStatus();
        };
        
        window.addEventListener('adminStatusChanged', handleAdminStatusChange);
        
        return () => {
            window.removeEventListener('adminStatusChanged', handleAdminStatusChange);
        };
    }, []);
    
    return (
        <AdminContext.Provider value={{ isAdmin, updateAdminStatus, logoutAdmin, refreshReviews }}>
            {children}
        </AdminContext.Provider>
    )
}

export default AdminContext
