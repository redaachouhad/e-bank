// src/hooks/useAuth.js
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const exp = decoded.exp;
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime < exp) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
  }, []);

  return { isAuthenticated };
};

export default useAuth;
