import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';

const AdminRoute = ({ children = null }: { children?: JSX.Element | null }) => {
  const { access_token } = { access_token: null };

  if (!access_token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<div>Login</div>} />

      <Route path="*" element={<div>NotFoundPage</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
