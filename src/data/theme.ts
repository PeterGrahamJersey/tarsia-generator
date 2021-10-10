import type { Theme } from 'theme-ui'

export const theme: Theme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Helvetica", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#222',
    background: '#4c5355',
    primary: '#c44b4f',
    secondary: '#AB3236',
    accent:'#607d86',
    highlight:'#fff',
    muted: '#cbcdcb',
    primaryDark:'#AB3236' 
    // bgDark: '#4c5355',
    // bgLight: '#cbcdcb',
    // textLight: '#eee',
    // textDark: '#222',
    // accent1: '#c44b4f',
    // accent1Dark:'#AB3236',
    // accent2: '#607d86',
    // text: '#000',
    // background: '#fff',
    // primary: '#33e',
  },

  buttons: {
    primary: {
      // color: 'textLight',
      '&:hover': {
        bg: 'primaryDark',
      },
    },
    icon: {
      width: '50px',
      fill: 'primary',
      stroke:'text',
      strokeWidth: '3',
      '&:hover': {
        fill: 'primaryDark',
      },
    },
  },

  forms: {
    label: {
      fontSize: 1,
      fontWeight: 'bold',
    },
    input: {
      // borderColor: 'gray',
      // bg:'bgLight',
      '&:focus': {
        // borderColor: 'primary',
        // boxShadow: t => `0 0 0 2px ${t.colors.accent1}`,
        // outline: 'none',
      },
    },
  }
}