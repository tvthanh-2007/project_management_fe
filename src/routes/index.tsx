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
import { useState } from 'react';
import Page403 from '../pages/Page403';
import Page404 from '../pages/Page404';
import Page500 from '../pages/Page500';
import ProjectCreatePage from '../pages/project/ProjectCreatePage';

const AppRoutes = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))

  return (
    <Routes>
      {/* check token exist -> redirect to dashboard */}
      <Route
        path="/login"
        element={!token ? <LoginPage setToken={setToken}/> : <Navigate to="/dashboard" />}
      />
      <Route element={<ProtectedRoute token={token} />}>
        {/* Master layout */}
        <Route path="/" element={<MainLayout setToken={setToken} />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/new" element={<ProjectCreatePage />} />
          <Route path="projects/:project_id" element={<ProjectDetailPage />} />
          <Route path="projects/:project_id/edit" element={<ProjectEditPage />} />
        </Route>

        <Route path="projects/:project_id/invitations/accept" element={<JoinProjectPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/403" element={<Page403 />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/500" element={<Page500 />} />
    </Routes>
  )
}

export default AppRoutes
