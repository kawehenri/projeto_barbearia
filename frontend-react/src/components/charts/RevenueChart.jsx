import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const RevenueChart = ({ data, title = 'Faturamento Mensal' }) => {
  // Dados de exemplo (substituir com dados reais da API)
  const defaultData = [
    { month: 'Jan', revenue: 4500, expenses: 2400 },
    { month: 'Fev', revenue: 5200, expenses: 2600 },
    { month: 'Mar', revenue: 6100, expenses: 2800 },
    { month: 'Abr', revenue: 5800, expenses: 2700 },
    { month: 'Mai', revenue: 7200, expenses: 3100 },
    { month: 'Jun', revenue: 8500, expenses: 3500 },
  ];

  const chartData = data || defaultData;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        
        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
              <XAxis 
                dataKey="month" 
                stroke="#B0B0B0"
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis 
                stroke="#B0B0B0"
                style={{ fontSize: '0.875rem' }}
                tickFormatter={(value) => `R$ ${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                }}
                formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                name="Receita"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ fill: '#D4AF37', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="expenses"
                name="Despesas"
                stroke="#F44336"
                strokeWidth={2}
                dot={{ fill: '#F44336', r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;

