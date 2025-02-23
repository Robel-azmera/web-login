export const isAuthenticated = () => {
    const idToken = localStorage.getItem("id_token");
    const accessToken = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");
  
    // Check if both tokens exist
    return !!idToken && !!accessToken;
  };