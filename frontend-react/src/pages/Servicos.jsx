import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { isAdmin } from '../utils/auth';

const Servicos = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        description: service.description || '',
        price: service.price,
        duration: service.duration,
        active: service.active,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        duration: '',
        active: true,
      });
    }
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditingService(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingService) {
        await api.put(`/services/${editingService.id}`, formData);
      } else {
        await api.post('/services', formData);
      }
      fetchServices();
      handleCloseForm();
    } catch (err) {
      console.error('Erro ao salvar serviço:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este serviço?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Erro ao excluir serviço:', err);
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Serviços
          </Typography>
          {isAdmin() && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenForm()}
            >
              Novo Serviço
            </Button>
          )}
        </Box>

        <Grid container spacing={2}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <ServiceCard service={service} />
              {isAdmin() && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => handleOpenForm(service)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(service.id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>

      {isAdmin() && (
        <Dialog open={formOpen} onClose={handleCloseForm} maxWidth="sm" fullWidth>
          <form onSubmit={handleSubmit}>
            <DialogTitle>
              {editingService ? 'Editar Serviço' : 'Novo Serviço'}
            </DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Descrição"
                name="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                type="number"
                label="Preço"
                name="price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                margin="normal"
                required
                inputProps={{ step: '0.01', min: '0' }}
              />
              <TextField
                fullWidth
                type="number"
                label="Duração (minutos)"
                name="duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                margin="normal"
                required
                inputProps={{ min: '15', step: '15' }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseForm}>Cancelar</Button>
              <Button type="submit" variant="contained">
                Salvar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}

      <Footer />
    </>
  );
};

export default Servicos;

