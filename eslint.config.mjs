import { config } from '@bubkoo/eslint-config'

export default config([
  {
    files: ['src/**/*.js', 'src/**/*.ts'],
  },
  {
    rules: {
      '@stylistic/brace-style': ['error', '1tbs', { allowSingleLine: true }],
      '@stylistic/operator-linebreak': ['error', 'after'],
    },
  },
])
