const _ = require('lodash')

const configs = {}

const versions = [
    '0.5.3',
];

function construct(config) {
    // TODO: improve the lodash-ness
    _.orderBy(versions, _.identity, ['desc'])
     .map(loadConfig)
     .forEach(function (defaultConfig) {
        config = compareOptions(defaultConfig, config)
        config = compareModules(defaultConfig, config)
    })

    return config
}

function loadConfig(version) {
    if (!configs[version]) {
        configs[version] = require('../stubs/versions/config.' + version + '.js')
    }

    return configs[version]
}

function compareOptions(defaults, config)
{
    // TODO: what other options need to be filtered...
    const keys = _.without(_.keys(defaults), ['modules'])

    return _.omitBy(config, function(v, k) {
        return _.includes(keys, k) && !_.isEmpty(defaults[k]) && _.isEqual(defaults[k], v)
    });
}

function compareModules(defaults, config) {
    if (_.isEmpty(defaults.modules)) {
        return config
    }

    config.modules = _.omitBy(config.modules, function(v, k) {
        return _.isEqual(v, defaults.modules[k])
    });

    if (_.isEmpty(config.modules)) {
        delete config.modules
    }

    return config;
}


module.exports = construct
