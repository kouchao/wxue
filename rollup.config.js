import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import inject from '@rollup/plugin-inject'
import path from 'path'
export default {
  input: 'src/index.js',
  output: [{
    file: 'dist/wxue.min.js',
    format: 'cjs'
  }],
  plugins: [nodeResolve(), terser(), inject({
    'process.env.NODE_ENV': path.resolve('env/process.js')
  })]
}
