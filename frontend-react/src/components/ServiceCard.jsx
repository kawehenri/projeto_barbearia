import { Card, CardContent, CardActions, Typography, Button, Chip } from '@mui/material';

const ServiceCard = ({ service, onSelect }) => {
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {service.description || 'Sem descrição'}
        </Typography>
        <Typography variant="h6" color="primary">
          R$ {parseFloat(service.price).toFixed(2)}
        </Typography>
        <Chip
          label={`${service.duration} min`}
          size="small"
          sx={{ mt: 1 }}
        />
      </CardContent>
      {onSelect && (
        <CardActions>
          <Button size="small" onClick={() => onSelect(service)}>
            Selecionar
          </Button>
        </CardActions>
      )}
    </Card>
  );
};

export default ServiceCard;

