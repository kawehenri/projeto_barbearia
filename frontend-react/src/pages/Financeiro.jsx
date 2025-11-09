import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Grid,
  Box,
} from '@mui/material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChartCard from '../components/ChartCard';
import { AttachMoney, CheckCircle, Cancel } from '@mui/icons-material';

const Financeiro = () => {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    paid: 0,
    pending: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payments');
      const data = response.data.data || response.data;
      setPayments(data);

      // Calcular estatísticas
      const total = data.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      const paid = data
        .filter((p) => p.status === 'pago')
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);
      const pending = data
        .filter((p) => p.status === 'pendente')
        .reduce((sum, p) => sum + parseFloat(p.amount), 0);

      setStats({ total, paid, pending });
    } catch (err) {
      console.error('Erro ao buscar pagamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pendente: 'warning',
      pago: 'success',
      cancelado: 'error',
      reembolsado: 'info',
    };
    return colors[status] || 'default';
  };

  const getMethodLabel = (method) => {
    const methods = {
      dinheiro: 'Dinheiro',
      cartao: 'Cartão',
      pix: 'PIX',
      transferencia: 'Transferência',
    };
    return methods[method] || method;
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financeiro
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <ChartCard
              title="Total"
              value={`R$ ${stats.total.toFixed(2)}`}
              icon={AttachMoney}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCard
              title="Pago"
              value={`R$ ${stats.paid.toFixed(2)}`}
              icon={CheckCircle}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <ChartCard
              title="Pendente"
              value={`R$ ${stats.pending.toFixed(2)}`}
              icon={Cancel}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Agendamento</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Serviço</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Método</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data Pagamento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>#{payment.appointment_id}</TableCell>
                  <TableCell>{payment.appointment?.user?.name}</TableCell>
                  <TableCell>{payment.appointment?.service?.name}</TableCell>
                  <TableCell>R$ {parseFloat(payment.amount).toFixed(2)}</TableCell>
                  <TableCell>
                    {payment.method ? getMethodLabel(payment.method) : '-'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={payment.status}
                      color={getStatusColor(payment.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {payment.paid_at
                      ? new Date(payment.paid_at).toLocaleDateString('pt-BR')
                      : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Financeiro;

