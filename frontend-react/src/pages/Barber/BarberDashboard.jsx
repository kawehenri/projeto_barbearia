import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import {
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import axios from 'axios';
import DashboardCard from '../../components/DashboardCard';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const BarberDashboard = () => {
  const [stats, setStats] = useState({
    totalCommissions: 0,
    pendingCommissions: 0,
    paidCommissions: 0,
    totalSales: 0,
    todayAppointments: 0,
    completedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/barber/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ mt: 8 }}>
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Meu Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Acompanhe seu desempenho
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Comissões Totais"
                  value={`R$ ${stats.totalCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  icon={AttachMoneyIcon}
                  color="success"
                  subtitle={`R$ ${stats.pendingCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} pendentes`}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Minhas Vendas"
                  value={stats.totalSales}
                  icon={ShoppingCartIcon}
                  color="primary"
                  subtitle="No mês"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Agendamentos Hoje"
                  value={stats.todayAppointments}
                  icon={CalendarIcon}
                  color="info"
                  subtitle={`${stats.completedAppointments} concluídos`}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Comissões Pagas"
                  value={`R$ ${stats.paidCommissions.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  icon={TrendingUpIcon}
                  color="warning"
                  subtitle="Recebidas"
                />
              </Grid>
            </Grid>

            {/* Gráficos */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Minhas Comissões (Últimos 6 meses)
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Gráfico será implementado com Recharts
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Próximos Agendamentos
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lista será implementada
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default BarberDashboard;

