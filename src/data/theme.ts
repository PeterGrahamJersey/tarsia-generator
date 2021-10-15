import type { Theme } from 'theme-ui'

export const theme: Theme = {
  sizes: {
    maxApp: '600px',
    minApp: '90%',
    maxPreview: '500px',
    buttonW: '140px',
    iconW:'50px'
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
      mt: '15%',
      p: '3',
      width: ['minApp', 'maxApp'],
      color: 'textDark',
    },
    
    menu: {
      justifyContent: 'space-evenly',
      flexWrap:'wrap',
      gap:'2',
      my:'3'
    },
    
    previewSvg: {
      maxWidth: 'maxPreview',
      my:'2',
    },
    
    hidden: {
      display: 'none'
    }


  },

  links: {
    nav: {
      px: 2,
      py: 1,
      // textTransform: 'uppercase',
      // letterSpacing: '0.2em',
    }
  },

  buttons: {
    primary: {
      width:'buttonW',
      color: 'text',
      '&:hover': {
        bg: 'primaryDark',
      },
    },
    icon: {
      width: 'iconW',
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
      borderWidth: '1.5px',
      '&:focus': {
      },
    },
  }
}