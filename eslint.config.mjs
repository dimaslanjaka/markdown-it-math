import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      '**/*.md',
      '**/tmp/**/*',
      '**/*.html',
      '**/*.py',
      '**/*.txt',
      '**/app/**/*',
      '**/dist/**/*',
      '**/dist/**/*',
      '**/node_modules/**/*',
      '**/tmp/**/*'
    ]
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ),
  {
    linterOptions: {
      reportUnusedDisableDirectives: true
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
        $: 'readonly',
        jQuery: 'readonly',
        adsbygoogle: 'writable',
        hexo: 'readonly'
      },

      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module'
    },

    rules: {
      'prettier/prettier': [
        'error',
        {
          $schema: 'https://json.schemastore.org/prettierrc',
          printWidth: 120,
          tabWidth: 2,
          useTabs: false,
          bracketSameLine: true,
          bracketSpacing: true,
          semi: true,
          singleQuote: true,
          trailingComma: 'none',
          endOfLine: 'lf',
          quoteProps: 'as-needed',

          overrides: [
            {
              excludeFiles: ['*.min.js', '*.min.cjs', '*.min.css', '*.min.html', '*.min.scss'],
              files: ['*.js', '*.css', '*.sass', '*.html', '*.md', '*.ts'],

              options: {
                semi: true
              }
            },
            {
              files: ['*.ejs', '*.njk', '*.html'],

              options: {
                parser: 'html'
              }
            }
          ]
        }
      ],

      '@typescript-eslint/explicit-function-return-type': 'off',
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_'
        }
      ],

      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-this-alias': [
        'error',
        {
          allowDestructuring: false,
          allowedNames: ['self', 'hexo']
        }
      ],

      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  },
  {
    files: ['**/*.js', '**/*.cjs'],

    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
];
