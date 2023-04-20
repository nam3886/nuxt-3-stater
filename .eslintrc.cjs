module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:typescript-sort-keys/recommended',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    CData: 'readonly',
    defineOptions: 'readonly', // naming convention used to define the type on generic Vue components
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  plugins: ['import', 'simple-import-sort', 'typescript-sort-keys', 'sort-keys-fix'],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        minimumDescriptionLength: 3,
        'ts-check': false,
        'ts-expect-error': { descriptionFormat: '^: TS\\d+ because .+$' },
        'ts-ignore': { descriptionFormat: '^: TS\\d+ because .+$' },
        'ts-nocheck': { descriptionFormat: '^: TS\\d+ because .+$' },
      },
    ],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { format: null, selector: 'default' },
      { format: ['camelCase', 'UPPER_CASE', 'PascalCase'], selector: 'variable' },
      { format: ['camelCase'], leadingUnderscore: 'allow', selector: 'parameter' },
      {
        format: ['camelCase'],
        leadingUnderscore: 'require',
        modifiers: ['private'],
        selector: 'memberLike',
      },
      { format: ['PascalCase'], selector: 'typeLike' },
    ],
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-unresolved': 'error',
    'lines-around-comment': [
      'error',
      {
        allowArrayStart: true,
        allowBlockStart: true,
        allowClassStart: true,
        allowObjectStart: true,
        beforeBlockComment: true,
        beforeLineComment: true,
      },
    ],
    'newline-before-return': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-restricted-imports': ['error', { patterns: ['.*', '!.nuxt'] }],
    'no-unreachable': 'error',
    'no-unused-vars': 'off',
    'object-shorthand': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { destructuring: 'any', ignoreReadBeforeAssign: false }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'require-await': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
    'typescript-sort-keys/interface': [
      'error',
      'asc',
      { caseSensitive: true, natural: false, requiredFirst: true },
    ],
    'vue/attributes-order': 'error',
    'vue/block-lang': ['error', { script: { lang: 'ts' }, style: { lang: 'scss' } }],
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      { ignores: ['/^Icon.*:/'], registeredComponentsOnly: false },
    ],
    'vue/component-tags-order': ['error', { order: ['script', 'template', 'style'] }],
    'vue/html-self-closing': ['error', { html: { normal: 'never', void: 'always' } }],
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-template-shadow': 'error',
    'vue/no-unused-properties': 'warn',
    'vue/no-unused-refs': 'error',
    'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
    'vue/no-v-text-v-html-on-component': 'warn',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/require-default-prop': 'error',
    'vue/require-explicit-emits': 'error',
    'vue/sort-keys': 'error',
    'vue/space-in-parens': 'error',
    'vue/v-on-event-hyphenation': ['error', 'always', { autofix: true }],
  },
  settings: {
    'import/resolver': {
      typescript: { alwaysTryTypes: true, project: ['./tsconfig.json'] },
    },
  },
};
