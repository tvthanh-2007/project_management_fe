import { Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/Login'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
