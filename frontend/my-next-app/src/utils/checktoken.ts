export const checkToken = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token; // Return true if the token exists, otherwise false
  };