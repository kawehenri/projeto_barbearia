import { Card, CardContent, Typography, Box } from '@mui/material';

const ChartCard = ({ title, value, subtitle, icon: Icon }) => {
  return (
    <Card sx={{ minWidth: 200, margin: 1 }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Icon sx={{ fontSize: 40, color: 'primary.main' }} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;

