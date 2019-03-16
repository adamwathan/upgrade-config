
function upgradeConfig(config) {
  return {
    ...config.options,
    theme: extractThemeProperties(config),
  }
}

function extractThemeProperties({ options, modules, plugins, ...theme }) {
  return updateThemePropertyNames(theme)
}

function updateThemePropertyNames(theme) {
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

module.exports = upgradeConfig
