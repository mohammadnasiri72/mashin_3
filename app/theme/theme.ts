// themes/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Ravi, Arial, sans-serif',
    allVariants: {
      fontFamily: 'Ravi, Arial, sans-serif',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Ravi, Arial, sans-serif',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          fontFamily: 'Ravi, Arial, sans-serif !important',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Ravi, Arial, sans-serif !important',
        },
      },
    },
  },
});

export default theme;