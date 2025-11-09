import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { clearAuth, getUser, isAdmin } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            Sistema Barbearia
          </Link>
        </Typography>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/agendamentos">
              Agendamentos
            </Button>
            <Button color="inherit" component={Link} to="/servicos">
              Serviços
            </Button>
            <Button color="inherit" component={Link} to="/barbeiros">
              Barbeiros
            </Button>
            {isAdmin() && (
              <Button color="inherit" component={Link} to="/financeiro">
                Financeiro
              </Button>
            )}
            {isAdmin() && (
              <Button color="inherit" component={Link} to="/dashboard/admin">
                Dashboard
              </Button>
            )}
            {!isAdmin() && (
              <Button color="inherit" component={Link} to="/dashboard/cliente">
                Meu Dashboard
              </Button>
            )}

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate('/perfil'); handleClose(); }}>
                Perfil
              </MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Cadastrar
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

