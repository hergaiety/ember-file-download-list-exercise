import Component from '@ember/component';
import { set, computed } from '@ember/object';

const defaultFiles = [];
const defaultSelectedFilePaths = [];

export default Component.extend({
  files: defaultFiles,
  selectedFilePaths: defaultSelectedFilePaths,
  selectAllStatus: computed('selectedFilePaths.[]', 'files.[]', function() {
    if (this.selectedFilePaths.length === this.files.length) {
      return 'all';
    } else return this.selectedFilePaths.length === 0 ? 'none' : 'some';
  }),

  actions: {
    toggleSelectAll() {
      if (this.selectedFilePaths.length === this.files.length) {
        set(this, 'selectedFilePaths', defaultSelectedFilePaths);
      } else {
        set(this, 'selectedFilePaths', this.files.map(file => file.path));
      }
    },
    toggleSelectedPath(path) {
      if (!this.selectedFilePaths.includes(path)) {
        this.selectedFilePaths.pushObject(path);
      } else {
        this.selectedFilePaths.removeObject(path);
      }
    },
  }
});
