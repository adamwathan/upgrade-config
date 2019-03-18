const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const stringifyObject = require('stringify-object')

const stringify = s => stringifyObject(s, {
  indent: '  ',
  inlineCharacterLimit: 100,
})

const configTemplate = `
module.exports = {
  prefix: %%PREFIX%%,
  important: %%IMPORTANT%%,
  separator: %%SEPARATOR%%,
  theme: %%THEME%%,
  variants: %%VARIANTS%%,
  plugins: %%PLUGINS%%,
}
`

function upgradeConfig(configPath) {
  const config = require(path.resolve(configPath))
  const configFileContents = fs.readFileSync(path.resolve(configPath), 'utf8')

  return _.flow([
    addOptionsSections(config),
    addPluginsSection(configFileContents),
    addThemeSection(config),
    addVariantsSection(config),
  ])(configTemplate)
}

function addOptionsSections(config) {
  return configTemplate => {
    return configTemplate
      .replace('%%PREFIX%%', `'${config.options.prefix}'`)
      .replace('%%IMPORTANT%%', `${config.options.important}`)
      .replace('%%SEPARATOR%%', `'${config.options.separator}'`)
  }
}

function addThemeSection(config) {
  return ([configTemplate, containerOptions]) => {
    return configTemplate.replace('%%THEME%%', stringify(upgradeThemeProperties(config, containerOptions)))
  }
}

function addVariantsSection(config) {
  return configTemplate => {
    return configTemplate.replace('%%VARIANTS%%', stringify(upgradeVariantsProperties(config)))
  }
}

function addPluginsSection(configFileContents) {
  return configTemplate => {
    const [updatedTemplate, containerOptions] = buildPluginsSection(configFileContents)
    return [configTemplate.replace('%%PLUGINS%%', updatedTemplate), containerOptions]
  }
}

function upgradeThemeProperties({ options, modules, plugins, ...theme }, containerOptions) {
  return {
    ..._.isEmpty(containerOptions) ? {} : { container: containerOptions },
    colors: theme.colors,
    screens: theme.screens,
    fontFamily: theme.fonts,
    fontSize: theme.textSizes,
    fontWeight: theme.fontWeights,
    lineHeight: theme.leading,
    letterSpacing: theme.tracking,
    textColor: theme.textColors,
    backgroundColor: theme.backgroundColors,
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

function buildPluginsSection(configFileContents) {
  let pluginsContents = configFileContents.match(/^(\s+)plugins:\s+\[(.*?)^\1]/ms)[2]

  if (!/require\(\s*'tailwindcss\/plugins\/container'\s*\)/.test(pluginsContents)) {
    return [`[${pluginsContents}]`, {}]
  }

  const objectOptionsPattern = /^(\s+)require\(\s*'tailwindcss\/plugins\/container'\s*\)\s*\(\s*{(.*?)\1\}\),?/ms

  if (objectOptionsPattern.test(pluginsContents)) {
    // console.log(pluginsContents.match(objectOptionsPattern)[2])
    const containerOptions = eval(`({\n${pluginsContents.match(objectOptionsPattern)[2]}\n})`)
    pluginsContents = pluginsContents.replace(objectOptionsPattern, '')
    return [`[${pluginsContents}]`, containerOptions]
  }

  // TODO: Handle weird non-object literal arguments (require(my-stupid-container-options)?)
}

module.exports = upgradeConfig
