import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

const BarberPerformanceChart = ({ data, title = 'Desempenho dos Barbeiros' }) => {
  // Dados de exemplo (substituir com dados reais da API)
  const defaultData = [
    { name: 'Carlos', sales: 45, commissions: 1250 },
    { name: 'João', sales: 38, commissions: 980 },
    { name: 'Paulo', sales: 42, commissions: 1100 },
    { name: 'Ricardo', sales: 35, commissions: 850 },
    { name: 'Pedro', sales: 40, commissions: 1050 },
  ];

  const chartData = data || defaultData;
  
  const colors = ['#D4AF37', '#F4CF5E', '#B8941F', '#FFD700', '#DAA520'];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        
        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 175, 55, 0.1)" />
              <XAxis 
                dataKey="name" 
                stroke="#B0B0B0"
                style={{ fontSize: '0.875rem' }}
              />
              <YAxis 
                stroke="#B0B0B0"
                style={{ fontSize: '0.875rem' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                }}
                formatter={(value, name) => {
                  if (name === 'commissions') {
                    return [`R$ ${value.toLocaleString('pt-BR')}`, 'Comissões'];
                  }
                  return [value, 'Vendas'];
                }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar 
                dataKey="sales" 
                name="Vendas"
                radius={[8, 8, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarberPerformanceChart;

