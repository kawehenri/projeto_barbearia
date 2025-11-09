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
  Business as BusinessIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import axios from 'axios';
import DashboardCard from '../../components/DashboardCard';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const SuperAdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalBarbers: 0,
    totalClients: 0,
    totalRevenue: 0,
    activeCompanies: 0,
    suspendedCompanies: 0,
    totalAppointments: 0,
    totalCommissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/superadmin/stats');
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
              Dashboard Super Admin
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Visão global do sistema
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Total de Barbearias"
                  value={stats.totalCompanies}
                  icon={BusinessIcon}
                  color="primary"
                  subtitle={`${stats.activeCompanies} ativas`}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Total de Barbeiros"
                  value={stats.totalBarbers}
                  icon={PeopleIcon}
                  color="info"
                  subtitle="Em todas as barbearias"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Faturamento Global"
                  value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  icon={AttachMoneyIcon}
                  color="success"
                  subtitle="Total do sistema"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Total de Clientes"
                  value={stats.totalClients}
                  icon={TrendingUpIcon}
                  color="warning"
                  subtitle="Ativos no sistema"
                />
              </Grid>
            </Grid>

            {/* Gráficos e tabelas virão aqui */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Faturamento por Barbearia
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
                      Top 5 Barbearias
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

export default SuperAdminDashboard;

