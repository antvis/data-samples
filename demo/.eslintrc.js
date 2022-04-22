const base = require('../.eslintrc.js');

const configs = {
  ...base,
};
// allow import/no-relative-packages in demo/ to import from repo src
configs.rules['import/no-relative-packages'] = 0;

module.exports = configs;
