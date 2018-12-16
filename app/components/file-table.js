import Component from '@ember/component';

const defaultFiles = [];
const defaultSelectedFilePaths = [];

export default Component.extend({
  files: defaultFiles,
  selectedFilePaths: defaultSelectedFilePaths,
});
