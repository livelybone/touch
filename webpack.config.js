const path = require('path')
const fs = require('fs')
const capitalize = require('./src/capitalize')

function getEntries() {
  const reg = /\.js$/
  return fs.readdirSync(path.resolve(__dirname, './src/modules'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/modules', filename)).isDirectory())
    .map(filename => ({
      name: [filename.replace(reg, '')],
      filename: path.resolve(__dirname, './src/modules', filename),
    }))
}

const config = [{ name: 'index', filename: './src/index.js' }, ...getEntries()].map(entry => ({
  mode: 'production',
  entry: { [entry.name]: entry.filename },
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: './[name].js',
    library: entry.name === 'index' ? 'Touch' : capitalize(entry.name),
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    '@livelybone/meta-scale': {
      commonjs: '@livelybone/meta-scale',
      commonjs2: '@livelybone/meta-scale',
      amd: '@livelybone/meta-scale',
      root: 'MetaScale',
    },
    '@livelybone/simple-observer': {
      commonjs: '@livelybone/simple-observer',
      commonjs2: '@livelybone/simple-observer',
      amd: '@livelybone/simple-observer',
      root: 'SimpleObserver',
    }
  }
}))

module.exports = config
