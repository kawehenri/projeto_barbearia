import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Box,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import api from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BarberCard from '../components/BarberCard';
import ScheduleForm from '../components/ScheduleForm';
import { isAdmin } from '../utils/auth';

const Barbeiros = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleFormOpen, setScheduleFormOpen] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState(null);

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const response = await api.get('/barbers');
      setBarbers(response.data);
    } catch (err) {
      console.error('Erro ao buscar barbeiros:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBarber = (barber) => {
    setSelectedBarber(barber);
    setScheduleFormOpen(true);
  };

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Barbeiros
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {barbers.map((barber) => (
            <Grid item xs={12} sm={6} md={4} key={barber.id}>
              <BarberCard
                barber={barber}
                onSelect={!isAdmin() ? handleSelectBarber : null}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ScheduleForm
        open={scheduleFormOpen}
        onClose={() => {
          setScheduleFormOpen(false);
          setSelectedBarber(null);
        }}
        onSuccess={() => {
          setScheduleFormOpen(false);
          setSelectedBarber(null);
        }}
        barberId={selectedBarber?.id}
      />

      <Footer />
    </>
  );
};

export default Barbeiros;

