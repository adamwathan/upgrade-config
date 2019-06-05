const comparator = require('./lib/comparator')

const default53Config = require('./stubs/versions/config.0.5.3.js')

console.log('Initial config: ', default53Config)

config = comparator(default53Config)

console.log('Resulting config: ', config)
