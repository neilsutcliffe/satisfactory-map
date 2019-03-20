// https://stackoverflow.com/questions/52641907/how-to-get-mobx-decorators-to-work-with-create-react-app-v2
const { addDecoratorsLegacy, override } = require('customize-cra');

module.exports = {
  webpack: override(addDecoratorsLegacy())
};
