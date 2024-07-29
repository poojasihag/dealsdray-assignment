// auth/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext.jsx';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  console.log('ProtectedRoute isAuthenticated:', isAuthenticated);

  if (loading) {
    // Show a loading indicator while the authentication status is being determined
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
