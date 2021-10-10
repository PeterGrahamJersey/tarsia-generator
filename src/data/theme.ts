import type { Theme } from 'theme-ui'

export const theme: Theme = {
  sizes: {
    maxApp: '600px',
    minApp: '90%',
    maxPreview: '500px'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Helvetica", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#eee',
    textDark: '#222',
    background: '#4c5355',
    primary: '#c44b4f',
    secondary: '#AB3236',
    accent:'#607d86',
    highlight:'#fff',
    muted: '#cbcdcb',
    primaryDark:'#AB3236',
    modalBg: '#fefefe',
    modalOverlayBg: 'rgba(0,0,0,0.4)',
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

  layout: {
    container: {
    },
    header: {
      bg:'accent',
      px:'2',
      py:'1'
    },
    body: {
      width: ['minApp', 'maxApp'],
    },
    footer: {
      bg:'muted',
      py: '2',
      mt: '4',
      color: 'textDark'
    },
    modal: {
      position: 'fixed', /* Stay in place */
      zIndex: 1, /* Sit on top */
      left: 0,
      top: 0,
      width: '100%', /* Full width */
      height: '100%', /* Full height */
      overflow: 'auto', /* Enable scroll if needed */
      bg: 'modalOverlayBg', /* Black w/ opacity */
    },
    modalContent: {
      bg: 'modalBg',
      mt: '15%', /* 15% from the top and centered */
      padding: '20px',
      border: '1px solid #888',
      width: ['minApp', 'maxApp'], /* Could be more or less, depending on screen size */
      color: 'text',
    },
    
    menu: {
      justifyContent: 'space-evenly',
    },
    
    previewSvg: {
      maxWidth: 'maxPreview',
      // mx: 'auto'
    },


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
      stroke:'textDark',
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