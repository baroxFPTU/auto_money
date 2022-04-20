import { extendTheme } from '@chakra-ui/react'

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brandPrimary: {
      100: '#e1ede8',
      200: '#c5e9da',
      300: '#98c3b2',
      400: '#74bda0',
      500: '#65C9A1',
      600: '#42AF9F',
      700: '#2E9596',
      800: '#2A7A87',
      900: '#2E6072'
    },
    brandSecondary: {
      100: '#ede7e2',
      200: '#ede1d6',
      300: '#d7c5b6',
      400: '#c1b1a0',
      500: '#EFDFCF',
      600: '#C1C1AD',
      700: '#93A493',
      800: '#68867F',
      900: '#45676D'
    }
  },
  shadows: {
    outline: '#98c3b2'
  }  
})

export default theme;