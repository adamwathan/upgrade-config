const _ = require('lodash')
const resolve = require('./resolveConfig')
const defaultConfig = require('../stubs/defaultConfig')
const defaults = resolve([defaultConfig])

function construct(config) {
    config.theme.extend = config.theme.extend || {}

    // TODO: pipe this sucka
    config = defaultSpacing(config, defaults)
    config = defaultColors(config, defaults)
    config = defaultVariants(config, defaults)
    config = defaultOptions(config, defaults)

    if (_.isEmpty(config.theme.extend)) {
        delete config.theme.extend
    }

    return config
}

function defaultSpacing(config, defaults) {

    compareTheme(config, 'width')
    compareTheme(config, 'height')
    compareTheme(config, 'padding')
    compareTheme(config, 'margin')
    compareTheme(config, 'negativeMargin')

    if (_.isEqual(config.theme.spacing, defaults.theme.spacing)) {
        delete config.theme.spacing
    }

    return config
}

function defaultColors(config, defaults) {
    compareTheme(config, 'backgroundColor')
    compareTheme(config, 'borderColor')
    compareTheme(config, 'textColor')

    if (_.isEqual(config.theme.colors, defaults.theme.colors)) {
        delete config.theme.colors
    }

    return config;
}

function defaultVariants(config, defaults) {
    config.variants = _.omitBy(config.variants, function(v, k) {
        return _.isEqual(v, defaults.variants[k])
    });

    return config;
}

function defaultOptions(config, defaults) {
    // TODO: filter "empty values" (what constitutes an empty values?)

    const keys = ['prefix', 'important', 'separator']

    return _.omitBy(config, function(v, k) {
        return _.includes(keys, k) && _.isEqual(defaults[k], v)
    });
}

// private
function compareTheme(obj, key) {
    var configWithoutKey = _.omit(obj, `theme.${key}`)

    var potentialConfig = resolve([configWithoutKey, defaultConfig])

    if (_.isEqual(obj.theme[key], potentialConfig.theme[key])) {
        delete obj.theme[key]
    } else if (_.isMatch(obj.theme[key], potentialConfig.theme[key])) {
        obj.theme.extend[key] = compliment(obj.theme[key], potentialConfig.theme[key])

        delete obj.theme[key]
    }
}

function compliment(obj, src) {
    return _.omitBy(obj, (value, key) => {
        return _.isEqual(src[key], value)
    })
}



module.exports = construct
