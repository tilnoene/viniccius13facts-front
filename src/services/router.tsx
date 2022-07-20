import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

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
      <Route path="/" element={<div>Página Inicial</div>} />

      <Route path="/:id" element={<div>Página Inicial com ID</div>} />

      <Route path="*" element={<div>NotFoundPage</div>} />
    </Routes>
  </BrowserRouter>
);

export default Router;
