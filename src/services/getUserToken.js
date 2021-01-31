const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
};

export default getUserToken;
