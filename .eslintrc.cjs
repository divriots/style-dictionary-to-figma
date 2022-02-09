module.exports = {
  extends: ['@open-wc/eslint-config', 'eslint-config-prettier'].map(require.resolve),
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        'import/no-unresolved': 'off', // eslint not smart enough atm to understand package exports maps
      },
    },
  ],
};
