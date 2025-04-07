import { useState, useEffect } from "react";

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(
    function () {
      const token = document.cookie;
      console.log("token client:", token);

      if (token) setIsAuthenticated(true);
      else setIsAuthenticated(false);
    },
    []
  );

  return { isAuthenticated };
}

export default useAuth;
