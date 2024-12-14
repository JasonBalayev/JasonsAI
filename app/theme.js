import { createTheme } from '@mui/material/styles';

export const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#6366F1' : '#4F46E5',
      light: mode === 'dark' ? '#818CF8' : '#6366F1',
      dark: mode === 'dark' ? '#4F46E5' : '#4338CA',
    },
    secondary: {
      main: mode === 'dark' ? '#EC4899' : '#DB2777',
      light: mode === 'dark' ? '#F472B6' : '#EC4899',
      dark: mode === 'dark' ? '#DB2777' : '#BE185D',
    },
    background: {
      default: mode === 'dark' ? '#0F172A' : '#F8FAFC',
      paper: mode === 'dark' ? '#1E293B' : '#FFFFFF',
      chat: mode === 'dark' ? '#334155' : '#F1F5F9',
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)'
        : 'linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)',
    },
    text: {
      primary: mode === 'dark' ? '#F8FAFC' : '#0F172A',
      secondary: mode === 'dark' ? '#CBD5E1' : '#475569',
    },
    divider: mode === 'dark' ? '#334155' : '#E2E8F0',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans)',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
      fontFamily: 'var(--font-geist-sans)',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      fontFamily: 'var(--font-geist-mono)',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          transition: 'all 0.3s ease-in-out',
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 20px',
          borderRadius: 0,
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: mode === 'dark' 
              ? '0 10px 20px -10px rgba(99, 102, 241, 0.5)'
              : '0 10px 20px -10px rgba(79, 70, 229, 0.5)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  },
}); 