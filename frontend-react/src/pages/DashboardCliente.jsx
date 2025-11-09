import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
} from '@mui/material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChartCard from '../components/ChartCard';
import { AttachMoney, Event, CheckCircle } from '@mui/icons-material';

const DashboardCliente = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard/client');
      setDashboard(response.data);
    } catch (err) {
      console.error('Erro ao buscar dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Container>
          <Typography>Carregando...</Typography>
        </Container>
      </>
    );
  }

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
        <Typography variant="h4" component="h1" gutterBottom>
          Meu Dashboard
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Total de Agendamentos"
              value={dashboard?.stats?.total_appointments || 0}
              icon={Event}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Próximos Agendamentos"
              value={dashboard?.stats?.upcoming_appointments || 0}
              icon={CheckCircle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Concluídos"
              value={dashboard?.stats?.completed_appointments || 0}
              icon={CheckCircle}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Total Gasto"
              value={`R$ ${parseFloat(dashboard?.stats?.total_spent || 0).toFixed(2)}`}
              icon={AttachMoney}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Próximos Agendamentos
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Horário</TableCell>
                      <TableCell>Barbeiro</TableCell>
                      <TableCell>Serviço</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboard?.upcoming_appointments?.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{new Date(apt.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{apt.time}</TableCell>
                        <TableCell>{apt.barber?.user?.name}</TableCell>
                        <TableCell>{apt.service?.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={apt.status}
                            color={getStatusColor(apt.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Histórico
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Barbeiro</TableCell>
                      <TableCell>Serviço</TableCell>
                      <TableCell>Valor</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboard?.appointment_history?.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{new Date(apt.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{apt.barber?.user?.name}</TableCell>
                        <TableCell>{apt.service?.name}</TableCell>
                        <TableCell>R$ {parseFloat(apt.payment?.amount || 0).toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip
                            label={apt.status}
                            color={getStatusColor(apt.status)}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default DashboardCliente;

