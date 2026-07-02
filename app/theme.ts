// app/theme.ts
"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
        head: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
        body: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          fontFamily: "var(--font-ravi), Ravi, Roboto, Helvetica, Arial, sans-serif !important",
        },
      },
    },
  },
});

export default theme;