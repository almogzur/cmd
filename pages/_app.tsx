import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"

import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles'; //importThemeProvider
import "@/styles/globals.css"

import { WindowSizeProvider } from "@/context/window_size"

import { MobileAdminComponentProvider } from "@/context/mobile_admin_selected_component_provider"
import { AdminDataGridOptionsProvider } from "@/context/admin_data_grid_options"
import { UserDataGridOptionsProvider } from "@/context/user_data_grid_options"
import { heIL } from "@mui/material/locale"
import { ThemeContextProvider } from "@/context/theme_context"


const theme = createTheme({
  direction: "rtl", // fix datagrid pinning
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: { main: "#1d2d50" },
    secondary: { main: "#1f252e" },
    warning: { main: "#fdb931" }
  },
  typography: {
    fontFamily: [
      'Rubik Dirt'
    ].join(",")
  },
  components: {
    MuiTypography: {
      defaultProps: {},
      styleOverrides: {
        root: { color: "black", }
      }
    },
    MuiInputBase: {
      defaultProps: {},
      styleOverrides: { root: {} }
    },
    // when in form-control
    MuiInputLabel: {
      defaultProps: {},
      styleOverrides: { root: {} }
    },
    MuiFormControl: {
      defaultProps: {},
      styleOverrides: { root: {} }
    },
    MuiOutlinedInput: {
      defaultProps: { notched: false },
      styleOverrides: { root: {} }
    },
    MuiStack: {
      styleOverrides: { root: {} }
    },
    MuiSelect: {
      defaultProps: {},
      styleOverrides: { root: {} }
    },
    MuiMenuItem: {
      defaultProps: {},
      styleOverrides: { root: {} },
    },
    MuiButton: {
      defaultProps: { variant: 'text' },
      styleOverrides: {
        root: {
          fontSize: "1em",
          fontWeight: 700,

        },
        outlined: {

          padding: 2
        }
      }
    },
  },
},
  heIL
)


const MyApp = ({
  Component,
  pageProps: { session, ...pageProps } }: AppProps) => {



  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={session}>
        <WindowSizeProvider>
          <ThemeContextProvider>
            <MobileAdminComponentProvider>
              <AdminDataGridOptionsProvider>
                <UserDataGridOptionsProvider>
                  <Component {...pageProps} />
                </UserDataGridOptionsProvider>
              </AdminDataGridOptionsProvider>
            </MobileAdminComponentProvider>
          </ThemeContextProvider>
        </WindowSizeProvider>
      </SessionProvider>
    </ThemeProvider>
  )
}
export default MyApp