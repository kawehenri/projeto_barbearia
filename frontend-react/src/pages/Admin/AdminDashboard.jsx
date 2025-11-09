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
  ContentCut as ContentCutIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import axios from 'axios';
import DashboardCard from '../../components/DashboardCard';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBarbers: 0,
    totalClients: 0,
    totalRevenue: 0,
    totalSales: 0,
    totalCommissions: 0,
    pendingCommissions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/stats');
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
              Dashboard Admin
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={4}>
              Visão geral da sua barbearia
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Barbeiros"
                  value={stats.totalBarbers}
                  icon={ContentCutIcon}
                  color="primary"
                  subtitle="Ativos"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Clientes"
                  value={stats.totalClients}
                  icon={PeopleIcon}
                  color="info"
                  subtitle="Cadastrados"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Faturamento"
                  value={`R$ ${stats.totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                  icon={AttachMoneyIcon}
                  color="success"
                  subtitle="Total no mês"
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <DashboardCard
                  title="Vendas"
                  value={stats.totalSales}
                  icon={ShoppingCartIcon}
                  color="warning"
                  subtitle="Total no mês"
                />
              </Grid>
            </Grid>

            {/* Gráficos */}
            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Faturamento Mensal
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
                      Top Barbeiros
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

export default AdminDashboard;

