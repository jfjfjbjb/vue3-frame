/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
    // '@vue/eslint-config-prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  rules: {
    'quotes': ['error', 'single'],
    // 'quote-props': ['error', 'as-needed'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-unused-vars': ['error', { args: 'none' }],
    'vue/multi-word-component-names': 0
  },
  globals: {
    require: 'writable',
    _: 'readonly',
    $config: 'readonly',
    $bus: 'readonly',
    $loading: 'readonly',
    $common: 'readonly',
    $message: 'readonly',
    $notification: 'readonly'
  }
};
