import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme/theme';

// Pages
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Super Admin
import SuperAdminDashboard from './pages/SuperAdmin/SuperAdminDashboard';

// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';

// Barber
import BarberDashboard from './pages/Barber/BarberDashboard';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota Pública */}
            <Route path="/login" element={<Login />} />

            {/* Rotas Super Admin */}
            <Route
              path="/superadmin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['super_admin']}>
                  <SuperAdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Rotas Admin */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            {/* Rotas Barbeiro */}
            <Route
              path="/barber/dashboard"
              element={
                <ProtectedRoute allowedRoles={['barbeiro']}>
                  <BarberDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect inicial */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* 404 */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
