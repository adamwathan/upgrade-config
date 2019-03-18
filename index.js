const fs = require('fs')
const path = require('path')
const _ = require('lodash')

function upgradeConfig(configPath) {
  const config = require(path.resolve(configPath))

  const partiallyUpgraded = {
    ...config.options,
    theme: upgradeThemeProperties(config),
    variants: upgradeVariantsProperties(config),
  }

  const configFileContents = fs.readFileSync('./fixtures/input.js', 'utf8')

  const pattern = /^  plugins:\s+\[(.*?)^  ]/ms

  console.log(configFileContents.match(pattern))

}

function upgradeThemeProperties({ options, modules, plugins, ...theme }) {
  return {
    colors: theme.colors,
    screens: theme.screens,
    fontFamily: theme.fonts,
    fontSize: theme.textSizes,
    fontWeight: theme.fontWeights,
    lineHeight: theme.leading,
    letterSpacing: theme.tracking,
    textColor: theme.textColors,
    backgroundColor: theme.backgroundColors,
    backgroundPosition: theme.backgroundPosition,
    backgroundSize: theme.backgroundSize,
    borderWidth: theme.borderWidths,
    borderColor: theme.borderColors,
    borderRadius: theme.borderRadius,
    width: theme.width,
    height: theme.height,
    minWidth: theme.minWidth,
    minHeight: theme.minHeight,
    maxWidth: theme.maxWidth,
    maxHeight: theme.maxHeight,
    padding: theme.padding,
    margin: theme.margin,
    negativeMargin: theme.negativeMargin,
    boxShadow: theme.shadows,
    zIndex: theme.zIndex,
    opacity: theme.opacity,
    fill: theme.svgFill,
    stroke: theme.svgStroke,
  }
}

function upgradeVariantsProperties({ modules }) {
  const propertyMap = {
    appearance: ['appearance'],
    backgroundAttachment: ['backgroundAttachment'],
    backgroundColors: ['backgroundColor'],
    backgroundPosition: ['backgroundPosition'],
    backgroundRepeat: ['backgroundRepeat'],
    backgroundSize: ['backgroundSize'],
    borderCollapse: ['borderCollapse'],
    borderColors: ['borderColor'],
    borderRadius: ['borderRadius'],
    borderStyle: ['borderStyle'],
    borderWidths: ['borderWidth'],
    cursor: ['cursor'],
    display: ['display'],
    flexbox: [
      'flexDirection',
      'flexWrap',
      'alignItems',
      'alignSelf',
      'justifyContent',
      'alignContent',
      'flex',
      'flexGrow',
      'flexShrink',
    ],
    float: ['float'],
    fonts: ['fontFamily'],
    fontWeights: ['fontWeight'],
    height: ['height'],
    leading: ['lineHeight'],
    lists: ['listStylePosition', 'listStyleType'],
    margin: ['margin'],
    maxHeight: ['maxHeight'],
    maxWidth: ['maxWidth'],
    minHeight: ['minHeight'],
    minWidth: ['minWidth'],
    negativeMargin: ['negativeMargin'],
    objectFit: ['objectFit'],
    objectPosition: ['objectPosition'],
    opacity: ['opacity'],
    outline: ['outline'],
    overflow: ['overflow'],
    padding: ['padding'],
    pointerEvents: ['pointerEvents'],
    position: ['position', 'inset'],
    resize: ['resize'],
    shadows: ['boxShadow'],
    svgFill: ['fill'],
    svgStroke: ['stroke'],
    tableLayout: ['tableLayout'],
    textAlign: ['textAlign'],
    textColors: ['textColor'],
    textSizes: ['fontSize'],
    textStyle: ['fontStyle', 'textTransform', 'textDecoration', 'fontSmoothing'],
    tracking: ['letterSpacing'],
    userSelect: ['userSelect'],
    verticalAlign: ['verticalAlign'],
    visibility: ['visibility'],
    whitespace: ['whitespace', 'wordBreak'],
    width: ['width'],
    zIndex: ['zIndex'],
  }

  return _(propertyMap).flatMap((value, key) => {
    return value.map(newKey => {
      return [newKey, modules[key]]
    })
  }).fromPairs().value()
}



module.exports = upgradeConfig
