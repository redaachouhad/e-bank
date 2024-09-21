import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function PrivateRessource({ component, path }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const exp = Math.floor(decoded.exp);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime > exp) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }
  return isAuthenticated ? component : <Navigate to={"/login"} />;
}

export default PrivateRessource;
