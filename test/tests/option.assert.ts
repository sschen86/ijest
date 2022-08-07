import tests from '@ijest';

tests('option.assert', (test, assert) => {
  test('option.assert.define', (ctx) => {
    assert.isFunction(assert.isStringNumber);
  });

  test('option.assert.use', (ctx) => {
    assert.isStringNumber('888');
    assert.isError(() => assert.isStringNumber(888));
    assert.isError(() => assert.isStringNumber('a8'));
  });
});
