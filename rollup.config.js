import fs from 'fs'
import path from 'path'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
import capitalize from './src/capitalize'

const formats = ['es', 'umd']

function getEntries() {
  const reg = /\.js$/
  return fs.readdirSync(path.resolve(__dirname, './src/modules'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/modules', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src/modules', filename),
      formats: formats.filter(f => f !== 'es'),
    }))
}

const conf = entry => ({
  input: entry.filename,
  external: entry.external ? ['@livelybone/meta-scale', '@livelybone/simple-observer'] : [],
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: 'index' === entry.name ? 'Touch' : capitalize(entry.name),
  })),
  plugins: [
    resolve(),
    commonjs(),
    (entry.needUglify !== false && uglify()),
  ]
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false, external: true },
  { name: 'index', filename: './src/index.js', formats: ['umd'] },
  ...getEntries()
].map(conf)
