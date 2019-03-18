const upgrade = require('./index')
const stringifyObject = require('stringify-object')
const prettier = require('prettier')
const fs = require('fs')

const format = code => prettier.format(code, { semi: false, parser: 'babel' })

test('it upgrades the config format', () => {
  // const legacyConfig = fs.readFileSync('./fixtures/input.js', 'utf8')
  // const legacyConfig = require('./fixtures/input.js')
  const newConfig = fs.readFileSync('./fixtures/output.js', 'utf8')
  // const newConfig = require('./fixtures/output.js')

  expect(format(upgrade('./fixtures/input.js'))).toEqual(format(newConfig))
})
