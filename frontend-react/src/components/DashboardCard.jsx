import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const DashboardCard = ({ title, value, icon: Icon, color = 'primary', subtitle }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          {Icon && (
            <Avatar
              sx={{
                bgcolor: `${color}.main`,
                width: 48,
                height: 48,
              }}
            >
              <Icon sx={{ color: color === 'primary' ? 'secondary.main' : 'white' }} />
            </Avatar>
          )}
        </Box>
        
        <Typography variant="h3" component="div" color="primary.main" fontWeight="bold">
          {value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" color="text.secondary" mt={1}>
            {subtitle}
          </Typography>
        )}
      </CardContent>
      
      {/* Decoração de fundo */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -20,
          right: -20,
          width: 100,
          height: 100,
          borderRadius: '50%',
          bgcolor: `${color}.main`,
          opacity: 0.05,
        }}
      />
    </Card>
  );
};

export default DashboardCard;

