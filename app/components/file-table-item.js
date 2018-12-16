import Component from '@ember/component';
import { computed } from '@ember/object';

const defaultFile = {};
const defaultSelectedFilePaths = [];

export default Component.extend({
  file: defaultFile,
  selectedFilePaths: defaultSelectedFilePaths,

  isSelected: computed('file.path', 'selectedFilePaths', function() {
    return this.selectedFilePaths.includes(this.file.path);
  }),
});
