import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const SalesAreaChart = ({ data, title = 'Evolução de Vendas' }) => {
  // Dados de exemplo (substituir com dados reais da API)
  const defaultData = [
    { date: '01/11', sales: 12 },
    { date: '05/11', sales: 15 },
    { date: '10/11', sales: 18 },
    { date: '15/11', sales: 22 },
    { date: '20/11', sales: 28 },
    { date: '25/11', sales: 25 },
    { date: '30/11', sales: 32 },
  ];

  const chartData = data || defaultData;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        
        <Box sx={{ width: '100%', height: 250, mt: 2 }}>
          <ResponsiveContainer>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="#B0B0B0"
                style={{ fontSize: '0.75rem' }}
              />
              <YAxis 
                stroke="#B0B0B0"
                style={{ fontSize: '0.75rem' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                }}
                formatter={(value) => [`${value} vendas`, '']}
              />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#D4AF37"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesAreaChart;

