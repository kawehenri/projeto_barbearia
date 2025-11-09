# 📊 COMO USAR OS GRÁFICOS RECHARTS

## Componentes de Gráficos Criados

### 1. RevenueChart (Linha)
**Uso:** Faturamento mensal, evolução de receitas

```jsx
import RevenueChart from '../components/charts/RevenueChart';

// No seu Dashboard
<RevenueChart 
  title="Faturamento Mensal"
  data={[
    { month: 'Jan', revenue: 4500, expenses: 2400 },
    { month: 'Fev', revenue: 5200, expenses: 2600 },
    // ...
  ]}
/>
```

### 2. BarberPerformanceChart (Barras)
**Uso:** Desempenho de barbeiros, comparação de vendas

```jsx
import BarberPerformanceChart from '../components/charts/BarberPerformanceChart';

<BarberPerformanceChart 
  title="Top Barbeiros do Mês"
  data={[
    { name: 'Carlos', sales: 45, commissions: 1250 },
    { name: 'João', sales: 38, commissions: 980 },
    // ...
  ]}
/>
```

### 3. CommissionsPieChart (Pizza)
**Uso:** Distribuição de comissões (pagas vs pendentes)

```jsx
import CommissionsPieChart from '../components/charts/CommissionsPieChart';

<CommissionsPieChart 
  title="Status das Comissões"
  data={[
    { name: 'Pagas', value: 15420, percentage: 65 },
    { name: 'Pendentes', value: 8300, percentage: 35 },
  ]}
/>
```

### 4. SalesAreaChart (Área)
**Uso:** Evolução de vendas ao longo do tempo

```jsx
import SalesAreaChart from '../components/charts/SalesAreaChart';

<SalesAreaChart 
  title="Vendas do Mês"
  data={[
    { date: '01/11', sales: 12 },
    { date: '05/11', sales: 15 },
    // ...
  ]}
/>
```

---

## Integrar nos Dashboards

### SuperAdminDashboard.jsx

```jsx
import RevenueChart from '../../components/charts/RevenueChart';
import BarberPerformanceChart from '../../components/charts/BarberPerformanceChart';

// Dentro do componente
<Grid container spacing={3} sx={{ mt: 2 }}>
  <Grid item xs={12} md={8}>
    <RevenueChart title="Faturamento Global" />
  </Grid>
  <Grid item xs={12} md={4}>
    <BarberPerformanceChart title="Top 5 Barbeiros" />
  </Grid>
</Grid>
```

### AdminDashboard.jsx

```jsx
import RevenueChart from '../../components/charts/RevenueChart';
import CommissionsPieChart from '../../components/charts/CommissionsPieChart';
import SalesAreaChart from '../../components/charts/SalesAreaChart';

<Grid container spacing={3} sx={{ mt: 2 }}>
  <Grid item xs={12} md={8}>
    <RevenueChart title="Faturamento da Barbearia" />
  </Grid>
  <Grid item xs={12} md={4}>
    <CommissionsPieChart />
  </Grid>
  <Grid item xs={12}>
    <SalesAreaChart title="Vendas Diárias" />
  </Grid>
</Grid>
```

### BarberDashboard.jsx

```jsx
import CommissionsPieChart from '../../components/charts/CommissionsPieChart';
import SalesAreaChart from '../../components/charts/SalesAreaChart';

<Grid container spacing={3} sx={{ mt: 2 }}>
  <Grid item xs={12} md={8}>
    <SalesAreaChart title="Minhas Vendas" />
  </Grid>
  <Grid item xs={12} md={4}>
    <CommissionsPieChart title="Minhas Comissões" />
  </Grid>
</Grid>
```

---

## Buscar Dados da API

### Exemplo completo com API:

```jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RevenueChart from '../../components/charts/RevenueChart';

const AdminDashboard = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRevenueData();
  }, []);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/admin/revenue');
      
      // Transformar dados da API para o formato do gráfico
      const chartData = response.data.map(item => ({
        month: item.month_name,
        revenue: parseFloat(item.total_revenue),
        expenses: parseFloat(item.total_expenses),
      }));
      
      setRevenueData(chartData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <RevenueChart 
        title="Faturamento Mensal" 
        data={revenueData} 
      />
    </Container>
  );
};
```

---

## Customização

### Mudar Cores:

```jsx
<Line
  stroke="#FF5733"  // Nova cor
  strokeWidth={2}
  // ...
/>
```

### Mudar Altura:

```jsx
<Box sx={{ width: '100%', height: 400 }}>  // Aumentar altura
  <ResponsiveContainer>
    {/* ... */}
  </ResponsiveContainer>
</Box>
```

### Adicionar Animação:

```jsx
<Line
  animationDuration={1500}
  animationBegin={0}
  // ...
/>
```

---

## Rotas do Backend para Gráficos

### Super Admin:
```bash
GET /api/v1/superadmin/revenue       # Faturamento global
GET /api/v1/superadmin/stats         # Estatísticas globais
```

### Admin:
```bash
GET /api/v1/admin/revenue            # Faturamento da barbearia
GET /api/v1/admin/stats              # Estatísticas da barbearia
GET /api/v1/admin/barbers            # Performance dos barbeiros
```

### Barbeiro:
```bash
GET /api/v1/barber/stats             # Minhas estatísticas
GET /api/v1/barber/commissions       # Minhas comissões
```

---

## Dicas de Performance

1. **Use useMemo** para dados que não mudam frequentemente:
```jsx
const chartData = useMemo(() => {
  return data.map(item => ({
    // transformação
  }));
}, [data]);
```

2. **Implemente Loading State:**
```jsx
{loading ? (
  <Box display="flex" justifyContent="center" p={4}>
    <CircularProgress />
  </Box>
) : (
  <RevenueChart data={chartData} />
)}
```

3. **Cache de Dados:**
```jsx
// Atualizar a cada 5 minutos
useEffect(() => {
  fetchData();
  const interval = setInterval(fetchData, 5 * 60 * 1000);
  return () => clearInterval(interval);
}, []);
```

---

## Exemplos de Transformação de Dados

### Backend retorna:
```json
{
  "revenue": [
    {"month": "2024-01", "total": "4500.00"},
    {"month": "2024-02", "total": "5200.00"}
  ]
}
```

### Transformar para Recharts:
```jsx
const chartData = response.data.revenue.map(item => ({
  month: new Date(item.month).toLocaleDateString('pt-BR', { month: 'short' }),
  revenue: parseFloat(item.total),
}));
```

---

## ✅ Checklist de Integração

- [ ] Instalar dependências (npm install)
- [ ] Importar componente de gráfico
- [ ] Criar função para buscar dados da API
- [ ] Transformar dados para formato do gráfico
- [ ] Adicionar loading state
- [ ] Adicionar error handling
- [ ] Testar com dados reais
- [ ] Ajustar cores/tamanhos conforme necessário

---

**Pronto!** Seus gráficos estão prontos para uso! 📊✨

