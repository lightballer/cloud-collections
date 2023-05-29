const useAuth = () => {
  return localStorage.getItem("username");
};

export default useAuth;
