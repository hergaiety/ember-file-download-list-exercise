import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, findAll, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const genericFile = () => {
  return {
    name: 'foo.bar',
    device: 'Baz',
    path: `~/foo{${randomNumber(1,9001)}.bar`,
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

  test('it can select toggle a row with clicks', async function(assert) {
    this.set('files', [genericFile(), genericFile()]);
    await render(hbs`{{file-table files=files}}`);
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected 0');
    assert.equal(find('[data-test-id=file-table-item-selected]').textContent.trim(), '', 'Not selected by default');

    await click('[data-test-action=file-table-item-toggle]');
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected 1');
    assert.equal(find('[data-test-id=file-table-item-selected]').textContent.trim(), 'Selected', 'Selected after click');

    await click('[data-test-action=file-table-item-toggle]');
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected 0');
    assert.equal(find('[data-test-id=file-table-item-selected]').textContent.trim(), '', 'Unselected after second click');
  });

  test('select all, with none selected', async function(assert) {
    this.set('files', [genericFile(), genericFile()]);
    await render(hbs`{{file-table files=files}}`);

    await click('[data-test-action=file-table-select-all]');
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected ' + this.files.length);
  });

  test('select all, with everything selected', async function(assert) {
    this.set('files', [genericFile(), genericFile()]);
    this.set('selectedFilePaths', this.files.map(file => file.path));
    await render(hbs`{{file-table files=files selectedFilePaths=selectedFilePaths}}`);

    await click('[data-test-action=file-table-select-all]');
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected 0');
  });

  test('select all, with some selected', async function(assert) {
    this.set('files', [genericFile(), genericFile()]);
    this.set('selectedFilePaths', [this.files[0].path]);
    await render(hbs`{{file-table files=files selectedFilePaths=selectedFilePaths}}`);

    await click('[data-test-action=file-table-select-all]');
    assert.equal(find('[data-test-action=file-table-select-all]').textContent.trim(), 'Selected ' + this.files.length);
  });
});