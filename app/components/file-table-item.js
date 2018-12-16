import Component from '@ember/component';
import { computed } from '@ember/object';

const defaultFile = {};
const defaultSelectedFilePaths = [];

export default Component.extend({
  tagName: 'tr',
  classNames: ['file-table-item'],
  classNameBindings: ['isSelected'],
  attributeBindings: ['data-test-id', 'data-test-action'],

  'data-test-id': 'file-table-item',
  'data-test-action': 'file-table-item-toggle',

  file: defaultFile,
  selectedFilePaths: defaultSelectedFilePaths,

  isSelected: computed('file.path', 'selectedFilePaths.[]', function() {
    return this.selectedFilePaths.includes(this.file.path);
  }),

  checkboxClass: computed('isSelected', function() {
    return this.isSelected ? 'on' : 'off';
  }),
});
