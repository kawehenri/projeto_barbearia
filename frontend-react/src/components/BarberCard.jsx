import { Card, CardContent, CardActions, Typography, Button, Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const BarberCard = ({ barber, onSelect }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6" component="div">
            {barber.user?.name || 'Barbeiro'}
          </Typography>
        </Box>
        {barber.specialty && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            <strong>Especialidade:</strong> {barber.specialty}
          </Typography>
        )}
        {barber.bio && (
          <Typography variant="body2" color="text.secondary">
            {barber.bio}
          </Typography>
        )}
      </CardContent>
      {onSelect && (
        <CardActions>
          <Button size="small" onClick={() => onSelect(barber)}>
            Ver Horários
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default BarberCard;

