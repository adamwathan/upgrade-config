#!/usr/bin/env node
const fs = require('fs')
const prettier = require('prettier')
const [,, ...args] = process.argv
const upgradeConfig = require('./index')

const format = code => prettier.format(code, { semi: false, singleQuote: true, parser: 'babel' })

try {
  var outputFile = './tailwind.config.js'

  if (args.length === 3 && args[1] === '-o') {
    outputFile = args[2]
  }

  fs.writeFileSync(outputFile, format(upgradeConfig(args[0])))

  console.log('Output converted Tailwind config: ' + outputFile)
} catch(err) {
  console.error('Failed to convert your Tailwind config. Review the Upgrade Guide for steps to complete the conversion: ')
  process.exit(1)
}
