// UserContext.js
import  { createContext, useContext, useState,useMemo } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

// Create Context
const UserContext = createContext();

// Create a Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const value = useMemo(() => ({ user, setUser }), [user]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
// Add propTypes validation for children
UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children is a React node and required
};

// Custom Hook to Access Context
export const useUser = () => useContext(UserContext);
