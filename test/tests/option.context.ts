import tests from '@ijest';

tests('option.context', (test, assert, context) => {
  test('option.context.2', (ctx) => {
    assert.isEqual(ctx, context);
  });

  test('option.context.1', (ctx) => {
    assert.isBe(ctx.name, 'shushu');
  });
});
