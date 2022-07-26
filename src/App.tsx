import Router from './services/router';
import { ToastContainer } from 'react-toastify';

import { createTheme, ThemeProvider } from '@mui/material';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
};

export default App;
