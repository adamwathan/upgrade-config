module.exports = {
  prefix: 'tw-',
  important: true,
  separator: '__',
  theme: {
    container: { center: true, padding: '2rem', prop: 'new' },
    colors: { red: '#ff0000' },
    screens: { sm: '400px' },
    fontFamily: { sans: ['Arial'] },
    fontSize: { sm: '14px' },
    fontWeight: { bold: '700' },
    lineHeight: { tight: 1.25 },
    letterSpacing: { normal: 0 },
    backgroundSize: { auto: 'auto' },
    borderWidth: { default: '1px' },
    borderRadius: { lg: '.5rem' },
    width: { px: '1px' },
    height: { screen: '100vh' },
    minWidth: { '0': '0' },
    minHeight: { full: '100%' },
    maxWidth: { md: '40rem' },
    maxHeight: { screen: '100vh' },
    padding: { '4': '1rem' },
    margin: { '8': '2rem' },
    negativeMargin: { '2': '.5rem' },
    boxShadow: { inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)' },
    zIndex: { '20': 20 },
    opacity: { '50': '.5' },
    fill: { current: 'currentColor' },
    stroke: { black: '#000' },
  },
  variants: {
    objectFit: false,
    objectPosition: false,
    fontStyle: ['responsive', 'hover', 'focus'],
    textTransform: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive', 'hover', 'focus']
  },
  plugins: [
    'some-plugin'
  ]
}
