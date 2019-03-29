const upgrade = require('./index')
const stringifyObject = require('stringify-object')
const prettier = require('prettier')
const fs = require('fs')

const stringify = s => stringifyObject(s, {
  indent: '  ',
  inlineCharacterLimit: 100,
})

const format = code => prettier.format(code, { parser: 'json' })

test('it upgrades the config format', () => {
  const newConfig = fs.readFileSync('./fixtures/output.js', 'utf8')
  const upgradedConfig = upgrade('./fixtures/input.js')

  expect(format(upgradedConfig)).toEqual(format(newConfig))
})
