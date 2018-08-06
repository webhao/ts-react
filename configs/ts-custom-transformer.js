const tsImportPluginFactory = require('ts-import-plugin');

module.exports = () => ({
  before: [tsImportPluginFactory({
    style: true,
    libraryDirectory: 'es',
  })],
});
