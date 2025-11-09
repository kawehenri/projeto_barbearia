import { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUser, setAuth } from '../utils/auth';

const Perfil = () => {
  const [user, setUser] = useState(getUser());
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const response = await api.get('/user');
      const updatedUser = response.data;
      
      // Atualizar dados locais
      const token = localStorage.getItem('token');
      setAuth(token, updatedUser);
      setUser(updatedUser);
      setFormData({
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone || '',
      });
      
      setMessage('Perfil atualizado com sucesso!');
    } catch (err) {
      setMessage('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Meu Perfil
          </Typography>
          
          {message && (
            <Alert severity={message.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Role:</strong> {user?.role}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              disabled
            />
            <TextField
              fullWidth
              label="Telefone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? 'Atualizando...' : 'Atualizar Perfil'}
            </Button>
          </form>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default Perfil;

