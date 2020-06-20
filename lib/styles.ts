import { createMuiTheme } from '@material-ui/core'
import { createGlobalStyle } from 'styled-components'

export const getTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3c9f80',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
})

export const GlobalStyles = createGlobalStyle``
