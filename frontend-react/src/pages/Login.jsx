import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { LockOutlined as LockIcon } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, isSuperAdmin, isAdmin, isBarber } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        
        // Redirecionar baseado na role
        setTimeout(() => {
          if (isSuperAdmin()) {
            navigate('/superadmin/dashboard');
          } else if (isAdmin()) {
            navigate('/admin/dashboard');
          } else if (isBarber()) {
            navigate('/barber/dashboard');
          } else {
            navigate('/cliente/dashboard');
          }
        }, 500);
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={24}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: 3,
          }}
        >
          {/* Logo/Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4CF5E 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
              boxShadow: '0 8px 24px rgba(212, 175, 55, 0.4)',
            }}
          >
            <LockIcon sx={{ fontSize: 40, color: '#000' }} />
          </Box>

          {/* Título */}
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #F4CF5E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            BarberShop SaaS
          </Typography>
          
          <Typography variant="body2" color="text.secondary" mb={3}>
            Sistema de Gestão de Barbearias
          </Typography>

          {/* Erro */}
          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #D4AF37 0%, #F4CF5E 100%)',
                color: '#000',
                '&:hover': {
                  background: 'linear-gradient(135deg, #F4CF5E 0%, #D4AF37 100%)',
                },
              }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Entrar'}
            </Button>
          </Box>

          {/* Credenciais de Teste */}
          <Box sx={{ mt: 3, width: '100%', textAlign: 'center' }}>
            <Typography variant="caption" color="text.secondary" display="block" mb={1}>
              Credenciais de teste:
            </Typography>
            <Typography variant="caption" color="primary.main" display="block">
              Super Admin: superadmin@sistema.com
            </Typography>
            <Typography variant="caption" color="primary.main" display="block">
              Admin: admin@barbearia-vip.com
            </Typography>
            <Typography variant="caption" color="primary.main" display="block">
              Barbeiro: carlos-silva@barbearia-vip.com
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              Senha: password
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
