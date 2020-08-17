import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/wxue.min.js',
    format: 'cjs'
  }],
  plugins: [nodeResolve(), terser()]
}
