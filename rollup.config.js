import { terser } from 'rollup-plugin-terser'
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/wxue.min.js',
    format: 'cjs',
    plugins: [terser()]
  }]
}
