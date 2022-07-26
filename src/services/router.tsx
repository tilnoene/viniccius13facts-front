import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

import Dashboard from '../pages/Admin/Dashboard';

const AdminRoute = ({ children = null }: { children?: JSX.Element | null }) => {
  const accessToken = localStorage.getItem('access_token');

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />

      <Route path="*" element={<div>NotFoundPage</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
