export default {
  '*.js': ['eslint --fix', 'prettier --write', 'git add'],
  '*.md': ['prettier --write', 'git add'],
  'package.json': ['node ./scripts/sort-package-json.js'],
};
