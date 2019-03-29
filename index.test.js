const upgrade = require('./index')
const prettier = require('prettier')
const fs = require('fs')

const format = code => prettier.format(code, { parser: 'json' })

test('it upgrades a simple config', () => {
  const expected = fs.readFileSync('./fixtures/output.js', 'utf8')
  const actual = upgrade('./fixtures/input.js')

  expect(format(actual)).toEqual(format(expected))
})
