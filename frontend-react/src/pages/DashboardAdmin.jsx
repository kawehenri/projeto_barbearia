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
} from '@mui/material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChartCard from '../components/ChartCard';
import {
  AttachMoney,
  Event,
  People,
  Schedule,
} from '@mui/icons-material';

const DashboardAdmin = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get('/dashboard/admin');
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
          Dashboard Administrativo
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Total Agendamentos"
              value={dashboard?.stats?.total_appointments || 0}
              icon={Event}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Agendamentos Hoje"
              value={dashboard?.stats?.appointments_today || 0}
              icon={Schedule}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Receita Total"
              value={`R$ ${parseFloat(dashboard?.stats?.total_revenue || 0).toFixed(2)}`}
              icon={AttachMoney}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Receita do Mês"
              value={`R$ ${parseFloat(dashboard?.stats?.revenue_this_month || 0).toFixed(2)}`}
              subtitle={`Mês anterior: R$ ${parseFloat(dashboard?.stats?.revenue_last_month || 0).toFixed(2)}`}
              icon={AttachMoney}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Clientes"
              value={dashboard?.stats?.total_clients || 0}
              icon={People}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ChartCard
              title="Barbeiros"
              value={dashboard?.stats?.total_barbers || 0}
              icon={People}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Agendamentos Recentes
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Data</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Barbeiro</TableCell>
                      <TableCell>Serviço</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboard?.recent_appointments?.map((apt) => (
                      <TableRow key={apt.id}>
                        <TableCell>{new Date(apt.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{apt.user?.name}</TableCell>
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

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Serviços Mais Populares
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Serviço</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dashboard?.popular_services?.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>{service.name}</TableCell>
                        <TableCell align="right">{service.total}</TableCell>
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

export default DashboardAdmin;

