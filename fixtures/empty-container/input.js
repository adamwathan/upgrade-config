module.exports = {
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
    '0': '0',
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
    '4': '1rem',
  },
  margin: {
    '8': '2rem',
  },
  negativeMargin: {
    '2': '.5rem',
  },
  shadows: {
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
  },
  zIndex: {
    '20': 20,
  },
  opacity: {
    '50': '.5',
  },
  svgFill: {
    current: 'currentColor',
  },
  svgStroke: {
    black: '#000',
  },
  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
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
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'focus'],
    svgFill: [],
    svgStroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },
  plugins: [
    require('tailwindcss/plugins/container')(),
    'some-plugin'
  ],
  options: {
    prefix: 'tw-',
    important: true,
    separator: '__'
  },
}
