import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // 追記
  {
    ignores: ['**/.next/**', '**/_next/**', '**/dist/**', '**/storybook-static/**', '**/lib/**'],
  },
  ...compat.extends('next/core-web-vitals', 'prettier'),
  {
    rules: {
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          shorthandLast: true,
        },
      ],
      'import/order': 'error',
    },
  },
]

export default eslintConfig
