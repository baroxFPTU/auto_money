import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    brandPrimary: {
      100: '#cceae3',
      200: '#99d6c8',
      300: '#67c1ac',
      400: '#34ad91',
      500: '#019875',
      600: '#017a5e',
      700: '#015b46',
      800: '#003d2f',
      900: '#001e17',
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
      900: '#45676D',
    },
  },
  shadows: {
    outline: '#98c3b2',
  },
});

const basicConfig = {
  input: {
    size: 'lg',
  },
};

export default theme;

export { basicConfig };
