#!/usr/bin/env node
const fs = require('fs')
const [,, ...args] = process.argv

const upgradeConfig = require('./index')

fs.writeFileSync('./tailwind.config.js', upgradeConfig(args[0]))
