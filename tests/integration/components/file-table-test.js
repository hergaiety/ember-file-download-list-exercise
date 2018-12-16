import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const genericFile = () => {
  return {
    name: 'foo.bar',
    device: 'Baz',
    path: '~/foo.bar',
    status: 'available',
  };
};

module('Integration | Component | file-table', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders expected elements', async function(assert) {
    await render(hbs`{{file-table}}`);

    assert.ok(this.element, 'Component itself');
    assert.ok(find('[data-test-id=file-table-action-bar]'), 'Action bar');
    assert.ok(find('[data-test-action=file-table-select-all]'), 'Select all');
    assert.ok(find('[data-test-action=file-table-download-selected]'), 'Download selected');
    assert.ok(find('[data-test-id=file-table-header]'), 'Table header');
    assert.notOk(find('[data-test-id=file-table-item]'), 'Should have no table rows without data');
  });

  test('it renders rows of files', async function(assert) {
    this.set('files', [genericFile(), genericFile()]);
    await render(hbs`{{file-table files=files}}`);

    assert.equal(findAll('[data-test-id=file-table-item]').length, 2, 'Found expected two rows');
  });
});