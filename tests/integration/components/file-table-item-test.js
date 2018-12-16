import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const genericFile = () => {
  return {
    name: 'foo.bar',
    device: 'Baz',
    path: '~/foo.bar',
    status: 'available',
  };
};

module('Integration | Component | file-table-item', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders expected elements', async function(assert) {
    await render(hbs`{{file-table-item}}`);

    assert.ok(this.element, 'Component itself');
    assert.ok(find('[data-test-id=file-table-item-name]'), 'Name');
  });

  test('it renders row with generic data', async function(assert) {
    this.set('file', genericFile());
    await render(hbs`{{file-table-item file=file}}`);

    assert.equal(find('[data-test-id=file-table-item-name]').textContent.trim(), this.file.name, 'Renders name as text');
    assert.equal(find('[data-test-id=file-table-item-device]').textContent.trim(), this.file.device, 'Renders device as text');
    assert.equal(find('[data-test-id=file-table-item-path]').textContent.trim(), this.file.path, 'Renders path as text');
    assert.equal(find('[data-test-id=file-table-item-status]').textContent.trim(), this.file.status, 'Renders status as text');
  });

  test('it handles toggling status visible elements', async function(assert) {
    this.set('file', genericFile());
    this.set('file.status', 'scheduled');
    await render(hbs`{{file-table-item file=file}}`);

    assert.equal(find('[data-test-id=file-table-item-status]').textContent.trim(), 'scheduled', 'Renders correct status text');
    assert.equal(find('[data-test-id=file-table-status-icon]').classList.contains('-scheduled'), true, 'Status icon has expected class');

    this.set('file', genericFile());
    assert.equal(find('[data-test-id=file-table-item-status]').textContent.trim(), 'available', 'Renders correct status text');
    assert.equal(find('[data-test-id=file-table-status-icon]').classList.contains('-available'), true, 'Status icon has expected class');
  });

  test('it handles toggling selected status based on incoming selectedFilePaths', async function(assert) {
    this.set('file', genericFile());
    this.set('selectedFilePaths', []);
    await render(hbs`{{file-table-item file=file selectedFilePaths=selectedFilePaths}}`);

    assert.equal(find('[data-test-id=file-table-item-selected-icon]').classList.contains('-off'), true, 'Not selected by default');

    this.set('selectedFilePaths', [this.file.path]);
    assert.equal(find('[data-test-id=file-table-item-selected-icon]').classList.contains('-on'), true, 'Not selected by default');

    this.set('selectedFilePaths', []);
    assert.equal(find('[data-test-id=file-table-item-selected-icon]').classList.contains('-off'), true, 'No longer selected');
  });
});
