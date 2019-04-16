# Tailwind Config Upgrader
Project for converting Tailwind pre-1.0 config to Tailwind 1.0 config.

## Installation
The Config Upgrader is designed to be run within your Tailwind CSS projects so you may run it before or after upgrading to [Tailwind 1.0](https://github.com/tailwindcss/tailwindcss/tree/next).

To install via npm or yarn, run:

```sh
# Using npm
npm install tailwindcss --save-dev

# Using Yarn
yarn add tailwindcss --dev

```


## Run
To upgrade your config and save to a new `tailwind.config.js` config file, run:

```sh
# Using npm
npx tailwind-upgrade [filename]

# Using Yarn
yarn tailwind-upgrade [filename]
```

You may also specify a custom destination for the upgraded config file using the `-o` option:

```sh
# Using npm
npx tailwind-upgrade [filename] -o [destination]

# Using Yarn
yarn tailwind-upgrade [filename] -o [destination]
```




## TODO
- Add borderColor.default dynamic theme reference
- revisit color options ability to use `theme => ...colors`
- refactor (consistent lodash usage, output formatting, BaseCode practices)
