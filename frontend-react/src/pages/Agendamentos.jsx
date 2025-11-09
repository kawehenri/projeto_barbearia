import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScheduleForm from '../components/ScheduleForm';

const Agendamentos = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments');
      setAppointments(response.data.data || response.data);
    } catch (err) {
      console.error('Erro ao buscar agendamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Deseja realmente excluir este agendamento?')) {
      try {
        await api.delete(`/appointments/${id}`);
        fetchAppointments();
      } catch (err) {
        console.error('Erro ao excluir agendamento:', err);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      agendado: 'info',
      confirmado: 'primary',
      em_andamento: 'warning',
      concluido: 'success',
      cancelado: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Agendamentos
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setFormOpen(true)}
          >
            Novo Agendamento
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Data</TableCell>
                <TableCell>Horário</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Barbeiro</TableCell>
                <TableCell>Serviço</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id}>
                  <TableCell>{new Date(apt.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>{apt.user?.name}</TableCell>
                  <TableCell>{apt.barber?.user?.name}</TableCell>
                  <TableCell>{apt.service?.name}</TableCell>
                  <TableCell>R$ {parseFloat(apt.service?.price || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={apt.status}
                      color={getStatusColor(apt.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(apt.id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <ScheduleForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSuccess={fetchAppointments}
      />

      <Footer />
    </>
  );
};

export default Agendamentos;

