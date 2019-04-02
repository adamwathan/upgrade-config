const upgrade = require('./index')
const prettier = require('prettier')
const fs = require('fs')

const format = code => prettier.format(code, { parser: 'babel' })

test('it upgrades a default 0.7.4 config', () => {
  const expected = fs.readFileSync('./fixtures/default/output.js', 'utf8')
  const actual = upgrade('./fixtures/default/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it upgrades a simple config', () => {
  const expected = fs.readFileSync('./fixtures/simple/output.js', 'utf8')
  const actual = upgrade('./fixtures/simple/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it upgrades a config without the tailwindcss/container plugin', () => {
  const expected = fs.readFileSync('./fixtures/no-container/output.js', 'utf8')
  const actual = upgrade('./fixtures/no-container/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it upgrades a config with multiple tailwindcss/container plugins', () => {
  const expected = fs.readFileSync('./fixtures/multiple-container/output.js', 'utf8')
  const actual = upgrade('./fixtures/multiple-container/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it upgrades a config which requires external plugins', () => {
  const expected = fs.readFileSync('./fixtures/external-plugins/output.js', 'utf8')
  const actual = upgrade('./fixtures/external-plugins/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it upgrades a config which uses require inline', () => {
  const expected = fs.readFileSync('./fixtures/inline-requires/output.js', 'utf8')
  const actual = upgrade('./fixtures/inline-requires/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it removes default variants from config', () => {
  const expected = fs.readFileSync('./fixtures/default-variants/output.js', 'utf8')
  const actual = upgrade('./fixtures/default-variants/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it removes default options from config', () => {
  const expected = fs.readFileSync('./fixtures/default-options/output.js', 'utf8')
  const actual = upgrade('./fixtures/default-options/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it extends theme options', () => {
  const expected = fs.readFileSync('./fixtures/extends-options/output.js', 'utf8')
  const actual = upgrade('./fixtures/extends-options/input.js')

  expect(format(actual)).toEqual(format(expected))
})

test('it maintains custom config options', () => {
  const expected = fs.readFileSync('./fixtures/overwritten-options/output.js', 'utf8')
  const actual = upgrade('./fixtures/overwritten-options/input.js')

  expect(format(actual)).toEqual(format(expected))
})
