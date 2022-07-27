import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

import Dashboard from '../pages/Admin/Dashboard';
import UserProvider, { useUser } from '../context/UserContext';

const AdminRoute = ({ children = null }: { children?: JSX.Element | null }) => {
  const accessToken = useUser();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/login"
        element={
          <UserProvider>
            <Login />
          </UserProvider>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <UserProvider>
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          </UserProvider>
        }
      />

      <Route path="*" element={<div>NotFoundPage</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
