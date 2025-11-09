import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Alert,
} from '@mui/material';
import api from '../services/api';

const ScheduleForm = ({ open, onClose, onSuccess, barberId, serviceId }) => {
  const [formData, setFormData] = useState({
    barber_id: barberId || '',
    service_id: serviceId || '',
    date: '',
    time: '',
    notes: '',
  });
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchBarbers();
      fetchServices();
    }
  }, [open]);

  useEffect(() => {
    if (formData.barber_id && formData.date) {
      fetchAvailableSlots();
    }
  }, [formData.barber_id, formData.date]);

  const fetchBarbers = async () => {
    try {
      const response = await api.get('/barbers');
      setBarbers(response.data);
    } catch (err) {
      console.error('Erro ao buscar barbeiros:', err);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
    } catch (err) {
      console.error('Erro ao buscar serviços:', err);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      const response = await api.get(`/barbers/${formData.barber_id}/available-slots`, {
        params: { date: formData.date },
      });
      setAvailableSlots(response.data.slots || []);
    } catch (err) {
      console.error('Erro ao buscar horários disponíveis:', err);
      setAvailableSlots([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post('/appointments', formData);
      onSuccess();
      onClose();
      setFormData({
        barber_id: '',
        service_id: '',
        date: '',
        time: '',
        notes: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar agendamento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Novo Agendamento</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Barbeiro"
                name="barber_id"
                value={formData.barber_id}
                onChange={handleChange}
                required
              >
                {barbers.map((barber) => (
                  <MenuItem key={barber.id} value={barber.id}>
                    {barber.user?.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Serviço"
                name="service_id"
                value={formData.service_id}
                onChange={handleChange}
                required
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    {service.name} - R$ {parseFloat(service.price).toFixed(2)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="date"
                label="Data"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: new Date().toISOString().split('T')[0] }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Horário"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={!formData.barber_id || !formData.date || availableSlots.length === 0}
              >
                {availableSlots.map((slot) => (
                  <MenuItem key={slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Observações"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            Agendar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ScheduleForm;

