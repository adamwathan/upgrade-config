module.exports = {
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
  },
  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    textDecoration: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },
  plugins: [
    require('tailwindcss/plugins/container')({
      // center: true,
      // padding: '1rem',
    }),
  ],
}
