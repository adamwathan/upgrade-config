const _ = require('lodash')
const resolve = require('./resolveConfig')
const defaultConfig = require('../stubs/defaultConfig')
const defaults = resolve([defaultConfig])

function construct(config) {
    // TODO: pipe this sucka
    config = defaultSpacing(config)
    config = defaultColors(config)
    config = defaultVariants(config)
    config = defaultOptions(config)

    return config
}

function defaultSpacing(config) {

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

function defaultColors(config) {
    compareTheme(config, 'backgroundColor')
    compareTheme(config, 'borderColor')
    compareTheme(config, 'textColor')

    if (_.isEqual(config.theme.colors, defaults.theme.colors)) {
        delete config.theme.colors
    }

    return config;
}

function defaultVariants(config) {
    config.variants = _.omitBy(config.variants, function(v, k) {
        return _.isEqual(v, defaults.variants[k])
    });

    return config;
}

function defaultOptions(config) {
    // TODO: what other options can be filtered...

    if (_.isEmpty(config.theme.extend)) {
        delete config.theme.extend
    }

    const keys = ['prefix', 'important', 'separator']

    return _.omitBy(config, function(v, k) {
        return _.includes(keys, k) && _.isEqual(defaults[k], v)
    });
}

// private
function compareTheme(obj, key) {
    var configWithoutKey = _.omit(obj, `theme.${key}`)

    var potentialConfig = resolve([configWithoutKey, defaultConfig])

    if (key === 'borderColor' && !_.isEqual(_.get(obj.theme, 'borderColor.default'), potentialConfig.theme.borderColor.default)) {
      delete potentialConfig.theme.borderColor.default
    }

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
