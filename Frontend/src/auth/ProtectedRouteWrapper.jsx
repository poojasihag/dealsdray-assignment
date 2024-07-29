import { lazy, Suspense } from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext.jsx';

// eslint-disable-next-line no-unused-vars
const ProtectedRoute = lazy(() => import('./ProtectedRoute'));

const ProtectedRouteWrapper = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default function LazyProtectedRoute() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProtectedRouteWrapper />
    </Suspense>
  );
}
