const { override, addBabelPlugin, addDecoratorsLegacy, disableEsLint } = require("customize-cra");

const addProposalClassProperties = () => config => addBabelPlugin(["@babel/plugin-proposal-class-properties", { loose: true }])(config);

module.exports = override(
  // MobX support
  addDecoratorsLegacy(),
  addProposalClassProperties(),
  disableEsLint(),
);
