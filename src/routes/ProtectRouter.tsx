import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  token: string | null;
}

const ProtectedRoute = ({ token }: ProtectedRouteProps) => {
  debugger
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />; // render các route con bên trong
};

export default ProtectedRoute;
