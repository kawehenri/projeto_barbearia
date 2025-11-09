import { createTheme } from '@mui/material/styles';

// Paleta de cores: Preto, Carvão, Dourado, Branco
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37', // Dourado
      light: '#F4CF5E',
      dark: '#B8941F',
      contrastText: '#000000',
    },
    secondary: {
      main: '#1A1A1A', // Preto carvão
      light: '#2A2A2A',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#0A0A0A', // Preto profundo
      paper: '#1A1A1A', // Carvão
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    },
    success: {
      main: '#4CAF50',
    },
    error: {
      main: '#F44336',
    },
    warning: {
      main: '#FF9800',
    },
    info: {
      main: '#2196F3',
    },
  },
  typography: {
    fontFamily: '"Montserrat", "Open Sans", "Roboto", "Arial", sans-serif',
    h1: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    h6: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontFamily: 'Open Sans',
      fontSize: '1rem',
    },
    body2: {
      fontFamily: 'Open Sans',
      fontSize: '0.875rem',
    },
    button: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #1A1A1A 0%, #0A0A0A 100%)',
          border: '1px solid rgba(212, 175, 55, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(212, 175, 55, 0.3)',
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(212, 175, 55, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        },
        contained: {
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 16px rgba(212, 175, 55, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#D4AF37',
            },
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #1A1A1A 0%, #0A0A0A 100%)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(180deg, #1A1A1A 0%, #0A0A0A 100%)',
          borderRight: '1px solid rgba(212, 175, 55, 0.2)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;

