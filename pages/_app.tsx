import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import { WindowSizeProvider } from "@/context/window_size"
import { createTheme , ThemeProvider} from "@mui/material"
import "@/styles/globals.css"

const theme = createTheme({
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
      defaultProps: { },
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
      }
    },
  },
},
)

const MyApp = ({ 
  Component,
   pageProps: {  session, ...pageProps } }: AppProps)=> {

  return (
    <ThemeProvider theme={theme}>
    <WindowSizeProvider>
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
    </WindowSizeProvider>
    </ThemeProvider>
  )
}
export default MyApp