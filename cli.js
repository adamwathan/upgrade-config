#!/usr/bin/env node
const fs = require('fs')
const prettier = require('prettier')
const [,, ...args] = process.argv

const upgradeConfig = require('./index')

const format = code => prettier.format(code, { semi: false, singleQuote: true, parser: 'babel' })

fs.writeFileSync('./tailwind.config.js', format(upgradeConfig(args[0])))
