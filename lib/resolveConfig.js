var _mergeWith = require("lodash/mergeWith");
var _isFunction = require("lodash/isFunction");
var _ = require("lodash");
var _map = require("lodash/map");
var _get = require("lodash/get");

function value(valueToResolve, ...args) {
  return (_isFunction)(valueToResolve) ? valueToResolve(...args) : valueToResolve;
}

function mergeExtensions({
  extend,
  ...theme
}) {
  return (_mergeWith)(theme, extend, (themeValue, extensions) => {
    if (!(_isFunction)(themeValue) && !(_isFunction)(extensions)) {
      return { ...themeValue,
        ...extensions
      };
    }

    return resolveThemePath => ({ ...value(themeValue, resolveThemePath),
      ...value(extensions, resolveThemePath)
    });
  });
}

function resolveFunctionKeys(object) {
  const resolveObjectPath = (key, defaultValue) => {
    const val = (_get)(object, key, defaultValue);
    return (_isFunction)(val) ? val(resolveObjectPath) : val;
  };

  return Object.keys(object).reduce((resolved, key) => {
    return { ...resolved,
      [key]: (_isFunction)(object[key]) ? object[key](resolveObjectPath) : object[key]
    };
  }, {});
}

function resolveConfig(configs) {
  return _.defaults({
    theme: resolveFunctionKeys(mergeExtensions(_.defaults({}, ..._map(configs, 'theme')))),
    variants: _.defaults({}, ..._map(configs, 'variants'))
  }, ...configs);
}

module.exports = resolveConfig
