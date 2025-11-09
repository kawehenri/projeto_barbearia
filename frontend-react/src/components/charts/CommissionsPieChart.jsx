import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const CommissionsPieChart = ({ data, title = 'Distribuição de Comissões' }) => {
  // Dados de exemplo (substituir com dados reais da API)
  const defaultData = [
    { name: 'Pagas', value: 15420, percentage: 65 },
    { name: 'Pendentes', value: 8300, percentage: 35 },
  ];

  const chartData = data || defaultData;

  const COLORS = {
    'Pagas': '#4CAF50',
    'Pendentes': '#FF9800',
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {`${percentage}%`}
      </text>
    );
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        
        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                }}
                formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <Legend 
                wrapperStyle={{
                  paddingTop: '20px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
        
        {/* Totais */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
          <Box textAlign="center">
            <Typography variant="h6" color="success.main" fontWeight="bold">
              R$ {chartData[0]?.value.toLocaleString('pt-BR')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pagas
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h6" color="warning.main" fontWeight="bold">
              R$ {chartData[1]?.value.toLocaleString('pt-BR')}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Pendentes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CommissionsPieChart;

