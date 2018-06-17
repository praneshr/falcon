import fs from 'fs'
import hook from 'css-modules-require-hook'
import sass from 'node-sass'

const variables = fs.readFileSync('./app/styles/_variables.scss', 'UTF8')

hook({
  extensions: ['.scss', '.css'],
  generateScopedName: '[local]',
  preprocessCss: data => sass.renderSync({ data: variables + data }).css,
})
