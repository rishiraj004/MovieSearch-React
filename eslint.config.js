import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import unusedImports from 'eslint-plugin-unused-imports'
import prettier from 'eslint-config-prettier'

export default tseslint.config([
  {
    ignores: [
      // Build outputs
      'dist',
      'build',
      'out',
      '.next',
      
      // Dependencies
      'node_modules',
      
      // Configuration files
      '*.config.js',
      '*.config.ts',
      '*.config.mjs',
      '*.config.cjs',
      'vite.config.*',
      'tailwind.config.*',
      'postcss.config.*',
      'webpack.config.*',
      'rollup.config.*',
      
      // Environment and deployment
      '.env',
      '.env.*',
      '.vercel',
      '.netlify',
      
      // Testing and coverage
      'coverage',
      'test-results',
      'playwright-report',
      'junit.xml',
      
      // Cache and temporary files
      '.cache',
      'tmp',
      'temp',
      '.tmp',
      '.temp',
      
      // Logs
      '*.log',
      'logs',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      
      // IDE and editor files
      '.vscode/settings.json',
      '.idea',
      '*.swp',
      '*.swo',
      '*~',
      
      // OS generated files
      '.DS_Store',
      'Thumbs.db',
      
      // Package manager files
      'package-lock.json',
      'yarn.lock',
      'pnpm-lock.yaml',
      
      // Static assets that don't need linting
      'public/**/*.js',
      'public/**/*.ts',
      'src/**/*.d.ts',
      
      // Generated or vendor files
      'src/lib/generated/**',
      'src/types/generated/**',
      'vendor/**',
      
      // Documentation that might contain code blocks
      '*.md',
      'docs/**',
      
      // Storybook
      '.storybook',
      'storybook-static',
      
      // ESLint and Prettier
      '.eslintcache',
      '.prettierrc*',
    ]
  },
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'],
      jsxA11y.flatConfigs.recommended,
      prettier,
    ],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'import': importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      // React specific rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'react/prop-types': 'off', // TypeScript handles this
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      
      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'off', // Handled by unused-imports
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      
      // Import rules
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      
      // Unused imports
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      
      // General code quality rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-shorthand': 'error',
      'prefer-template': 'error',
      'template-curly-spacing': 'error',
      'eqeqeq': ['error', 'always'],
      'no-duplicate-imports': 'error',
      
      // Accessibility rules (from jsx-a11y plugin)
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-has-content': 'error',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',
    },
  },
  {
    files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
])
