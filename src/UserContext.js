import React, { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const updateUserData = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use the context
export const useUserContext = () => useContext(UserContext);
