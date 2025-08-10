import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login/Login'
import ProtectedRoute from './ProtectRouter';
import Dashboard from '../pages/Dashboard';
import ProjectList from '../pages/project/ProjectListPage';
import MainLayout from '../components/MainLayout';

const AppRoutes = () => {
  const isLoggedIn = true; // lấy trạng thái thật từ context hoặc redux

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
        </Route>
      </Route>
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
      />
    </Routes>
  )
}

export default AppRoutes
