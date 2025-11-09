import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Box,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Business as BusinessIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as LocalOfferIcon,
  AttachMoney as AttachMoneyIcon,
  Settings as SettingsIcon,
  ExitToApp as ExitToAppIcon,
  ContentCut as ContentCutIcon,
  Inventory as InventoryIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const drawerWidth = 260;

const Sidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isSuperAdmin, isAdmin, isBarber } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu Super Admin
  const superAdminMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/superadmin/dashboard' },
    { text: 'Barbearias', icon: <BusinessIcon />, path: '/superadmin/companies' },
    { text: 'Vendas', icon: <ShoppingCartIcon />, path: '/superadmin/sales' },
    { text: 'Comissões', icon: <AttachMoneyIcon />, path: '/superadmin/commissions' },
  ];

  // Menu Admin
  const adminMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Barbeiros', icon: <ContentCutIcon />, path: '/admin/barbers' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/admin/clients' },
    { text: 'Produtos', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Vendas', icon: <ShoppingCartIcon />, path: '/admin/sales' },
    { text: 'Comissões', icon: <AttachMoneyIcon />, path: '/admin/commissions' },
    { text: 'Serviços', icon: <LocalOfferIcon />, path: '/admin/services' },
    { text: 'Configurações', icon: <SettingsIcon />, path: '/admin/settings' },
  ];

  // Menu Barbeiro
  const barberMenu = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/barber/dashboard' },
    { text: 'Agendamentos', icon: <CalendarIcon />, path: '/barber/appointments' },
    { text: 'Minhas Vendas', icon: <ShoppingCartIcon />, path: '/barber/sales' },
    { text: 'Comissões', icon: <AttachMoneyIcon />, path: '/barber/commissions' },
    { text: 'Produtos', icon: <InventoryIcon />, path: '/barber/products' },
  ];

  let menuItems = [];
  if (isSuperAdmin()) {
    menuItems = superAdminMenu;
  } else if (isAdmin()) {
    menuItems = adminMenu;
  } else if (isBarber()) {
    menuItems = barberMenu;
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      open={open}
      onClose={onClose}
    >
      {/* Header do Sidebar */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(135deg, #D4AF37 0%, #F4CF5E 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          BarberShop
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Sistema SaaS
        </Typography>
      </Box>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* Perfil do Usuário */}
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: 'primary.main',
            color: 'secondary.main',
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          <Typography variant="body2" fontWeight={600} noWrap>
            {user?.name}
          </Typography>
          <Typography variant="caption" color="primary.main" textTransform="capitalize">
            {user?.role?.replace('_', ' ')}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, px: 1, py: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                  borderLeft: isActive ? '3px solid' : '3px solid transparent',
                  borderColor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(212, 175, 55, 0.05)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'primary.main' : 'text.primary',
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />

      {/* Logout */}
      <Box sx={{ p: 1 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'error.dark',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'error.main', minWidth: 40 }}>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            primaryTypographyProps={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'error.main',
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

