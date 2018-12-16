import Component from '@ember/component';

const defaultFiles = [];
const defaultSelectedFilePaths = [];

export default Component.extend({
  files: defaultFiles,
  selectedFilePaths: defaultSelectedFilePaths,

  actions: {
    toggleSelectedPath(path) {
      if (!this.selectedFilePaths.includes(path)) {
        this.selectedFilePaths.pushObject(path);
      } else {
        this.selectedFilePaths.removeObject(path);
      }
    },
  }
});
