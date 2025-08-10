import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/login/Login'
import ProtectedRoute from './ProtectRouter';
import MainLayout from '../components/MainLayout';
import Dashboard from '../pages/Dashboard';
import ProjectListPage from '../pages/project/ProjectListPage';
import ProjectDetailPage from '../pages/project/ProjectDetailPage';
import ProjectEditPage from '../pages/project/ProjectEditPage';
import NotFoundPage from '../pages/NotFoundPage';
import JoinProjectPage from '../pages/project/JoinProjectPage';

const AppRoutes = () => {
  const isLoggedIn = true; // lấy trạng thái thật từ context hoặc redux

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="projects/:id/edit" element={<ProjectEditPage />} />
        </Route>

        <Route path="projects/:id/invitations/accept" element={<JoinProjectPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
