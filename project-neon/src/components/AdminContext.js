
import React, { createContext, useState, useContext } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdmin, setAdmin] = useState(false);

  const adminLogin = () => {
    // Perform login logic here
    // Sets to true for testing purposes
    setAdmin(true);
  };

  const adminLogout = () => {
    // Logout logic should not matter unless we need the frontend to know
    setAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminLogin, adminLogout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
