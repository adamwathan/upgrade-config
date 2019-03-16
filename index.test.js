const upgrade = require('./index')
const stringifyObject = require('stringify-object')
const prettier = require('prettier')

test('it upgrades the config format', () => {
  const legacyConfig = {
    colors: {
      red: '#ff0000'
    },
    screens: {
      sm: '400px'
    },
    fonts: {
      sans: ['Arial']
    },
    textSizes: {
      sm: '14px'
    },
    fontWeights: {
      bold: '700'
    },
    leading: {
      tight: 1.25
    },
    tracking: {
      normal: 0
    },
    textColors: {
      red: '#ff0000'
    },
    backgroundColors: {
      red: '#ff0000'
    },
    backgroundPosition: {
      center: 'center'
    },
    backgroundSize: {
      auto: 'auto'
    },
    borderWidths: {
      default: '1px'
    },
    borderColors: {
      default: '#ff0000',
      red: '#ff0000',
    },
    borderRadius: {
      lg: '.5rem'
    },
    width: {
      px: '1px',
    },
    height: {
      screen: '100vh',
    },
    minWidth: {
      0: '0',
    },
    minHeight: {
      full: '100%',
    },
    maxWidth: {
      md: '40rem',
    },
    maxHeight: {
      screen: '100vh',
    },
    padding: {
      4: '1rem',
    },
    margin: {
      8: '2rem',
    },
    negativeMargin: {
      2: '.5rem',
    },
    shadows: {
      inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    },
    zIndex: {
      20: 20,
    },
    opacity: {
      50: '.5',
    },
    svgFill: {
      current: 'currentColor',
    },
    svgStroke: {
      black: '#000',
    },
    options: {
      prefix: 'tw-',
      important: true,
      separator: '__'
    }
  }

  expect(upgrade(legacyConfig)).toEqual({
    prefix: 'tw-',
    important: true,
    separator: '__',
    theme: {
      colors: {
        red: '#ff0000'
      },
      screens: {
        sm: '400px'
      },
      fontFamily: {
        sans: ['Arial']
      },
      fontSize: {
        sm: '14px'
      },
      fontWeight: {
        bold: '700'
      },
      lineHeight: {
        tight: 1.25
      },
      letterSpacing: {
        normal: 0
      },
      textColor: {
        red: '#ff0000'
      },
      backgroundColor: {
        red: '#ff0000'
      },
      backgroundPosition: {
        center: 'center'
      },
      backgroundSize: {
        auto: 'auto'
      },
      borderWidth: {
        default: '1px'
      },
      borderColor: {
        default: '#ff0000',
        red: '#ff0000',
      },
      borderRadius: {
        lg: '.5rem'
      },
      width: {
        px: '1px',
      },
      height: {
        screen: '100vh',
      },
      minWidth: {
        0: '0',
      },
      minHeight: {
        full: '100%',
      },
      maxWidth: {
        md: '40rem',
      },
      maxHeight: {
        screen: '100vh',
      },
      padding: {
        4: '1rem',
      },
      margin: {
        8: '2rem',
      },
      negativeMargin: {
        2: '.5rem',
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      },
      zIndex: {
        20: 20,
      },
      opacity: {
        50: '.5',
      },
      fill: {
        current: 'currentColor',
      },
      stroke: {
        black: '#000',
      },
    }
  })
})
