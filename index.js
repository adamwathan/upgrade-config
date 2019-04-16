const Module = require('module')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const stringifyObject = require('stringify-object')
const optimizer = require('./lib/optimizer')

const stringify = s => stringifyObject(s, {
    indent: '  ',
    inlineCharacterLimit: 100,
})

function upgradeConfig(configPath) {
    // load the config, but don't `require` modules
    // instead create an intermediate
    // representation to evaluate later so certain
    // calls to `require` can be preserved
    // e.g. plugins
    const originalRequire = Module.prototype.require

    Module.prototype.require = function(moduleName) {
        return options => ({
            _require: moduleName,
            _options: options
        })
    }

    var config = originalRequire(path.resolve(configPath))

    Module.prototype.require = originalRequire


    // store "special keys" and remove them from
    // config so it can be parsed later
    const plugins = config.plugins || [];
    delete config.plugins;


    // re-`require` any intermediate representation
    // on the config object so all the config options
    // are in one object
    const mapValuesDeep = (obj) => {
        if (_.isArray(obj)) {
            return obj.map(innerObj => mapValuesDeep(innerObj));
        }

        if (_.isObject(obj)) {
            if (_.isEqual(_.sortBy(_.keys(obj)), _.sortBy(['_require', '_options']))) {
                // TODO: what if _require is "defaultConfig"

                return require(obj._require)(obj._options)
            }

            return _.mapValues(obj, val => mapValuesDeep(val));
        }

        return obj;
    };

    config = mapValuesDeep(config)

    // TODO: remap to new tailwindcss options
    config = {
        ...config.options,
        theme: extractThemeProperties(config),
        variants: extractVariantsProperties(config),
    }

    // now remove any intermediate representations
    // which reference old tailwindcss modules from
    // "special keys"
    tailwind_plugins = _.remove(plugins, function(plugin) {
        if (!_.isObject(plugin)) {
            return false
        }

        if (!_.isEqual(_.sortBy(_.keys(plugin)), _.sortBy(['_require', '_options']))) {
            return false
        }

        return plugin._require === 'tailwindcss/plugins/container'
    })

    const container = _.merge({}, ..._.map(tailwind_plugins, '_options'));

    if (_.isEmpty(container)) {
        delete config.theme.container
    } else {
        config.theme.container = container
    }


    // rebuild plugins as a string representation
    const strings = _.map(plugins, function(plugin) {
        if (_.isObject(plugin) && _.isEqual(_.sortBy(_.keys(plugin)), _.sortBy(['_require', '_options']))) {
            return `require('${plugin._require}')(${plugin._options ? stringify(plugin._options) : ''})`
        }

        if (isReplacedRequireFunction(plugin)) {
            return `require('${plugin()._require}')`
        }

        return stringify(plugin)
    })

    if (strings.length) {
        config.plugins = '%%PLUGINS%%'
    }

    config = optimizer(config);

    // TODO: override theme.x with potentional theme =>

    // var tempVariable = config.theme.width
    // config.theme.width = theme => ({
    //     ...theme('spacing'),
    //     _placeholder
    // })
    //
    // config.theme.width = stringify(config.theme.width).replace('_placeholder', splat(tempVariable))

    return 'module.exports = ' + stringify(config).replace("'%%PLUGINS%%'", '[' + _.join(strings) + ']');
}


function extractThemeProperties({
    options,
    modules,
    plugins,
    ...theme
}) {
    return updateThemePropertyNames(theme)
}

function extractVariantsProperties({
    modules
}) {
    return updateVariantsPropertyNames(modules)
}

function updateThemePropertyNames(theme) {
    return _.omitBy({
        container: {},
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
        spacing: theme.spacing,
        extend: {}
    }, _.isUndefined)
}

function updateVariantsPropertyNames(modules) {
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
    }).fromPairs().omitBy(_.isUndefined).value()
}

function isReplacedRequireFunction(func) {
  if (!_.isFunction(func)) {
    return false;
  }

  let source = func.toString().replace(/\s/g, '')

  return source === 'options=>({_require:moduleName,_options:options})'
}

module.exports = upgradeConfig
