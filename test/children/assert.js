export default function assert (ctx, { tests, test, assert }) {
  tests('runUtil.assert', () => {
    test('assert.isTrue', () => {
      assert.isTrue(true)
      assert.isError(() => assert.isTrue(false))
      assert.isError(() => assert.isTrue(0))
      assert.isError(() => assert.isTrue(''))
      assert.isError(() => assert.isTrue('aaa'))
      assert.isError(() => assert.isTrue({}))
    })

    test('assert.isFalse', () => {
      assert.isFalse(false)
      assert.isError(() => assert.isFalse(true))
      assert.isError(() => assert.isFalse(0))
      assert.isError(() => assert.isFalse(''))
      assert.isError(() => assert.isFalse('aaa'))
      assert.isError(() => assert.isFalse({}))
    })

    test('assert.isTruly', () => {
      assert.isTruly(true)
      assert.isTruly(1)
      assert.isTruly('1')
      assert.isTruly([])
      assert.isTruly({})
      assert.isTruly(function () {})
      assert.isError(() => assert.isTruly(false))
      assert.isError(() => assert.isTruly(0))
      assert.isError(() => assert.isTruly(''))
      assert.isError(() => assert.isTruly(NaN))
      assert.isError(() => assert.isTruly(undefined))
      assert.isError(() => assert.isTruly(null))
    })

    test('assert.isFalsy', () => {
      assert.isFalsy(false)
      assert.isFalsy(0)
      assert.isFalsy('')
      assert.isFalsy(NaN)
      assert.isFalsy(undefined)
      assert.isFalsy(null)
      assert.isError(() => assert.isFalsy(true))
      assert.isError(() => assert.isFalsy([]))
      assert.isError(() => assert.isFalsy({}))
      assert.isError(() => assert.isFalsy('1'))
      assert.isError(() => assert.isFalsy(1))
      assert.isError(() => assert.isFalsy(function () {}))
    })

    test('assert.isBoolean', () => {
      assert.isBoolean(true)
      assert.isBoolean(false)
      assert.isError(() => assert.isBoolean(1))
      assert.isError(() => assert.isBoolean('1'))
      assert.isError(() => assert.isBoolean([]))
      assert.isError(() => assert.isBoolean({}))
      assert.isError(() => assert.isBoolean(function () {}))
    })

    test('assert.isFunction', () => {
      assert.isFunction(function () {})
      // eslint-disable-next-line no-new-func
      assert.isFunction(Function())
      assert.isFunction(() => {})
      assert.isFunction(async function () {})
      assert.isError(() => assert.isFunction(1))
      assert.isError(() => assert.isFunction('1'))
      assert.isError(() => assert.isFunction([]))
      assert.isError(() => assert.isFunction({}))
      assert.isError(() => assert.isFunction(true))
      assert.isError(() => assert.isFunction(false))
      assert.isError(() => assert.isFunction(undefined))
      assert.isError(() => assert.isFunction(null))
    })

    test('assert.isArray', () => {
      assert.isArray([])
      assert.isArray(Array(11))
      assert.isError(() => assert.isArray(1))
      assert.isError(() => assert.isArray('1'))
      // assert.isError(() => assert.isArray([]))
      assert.isError(() => assert.isArray({}))
      assert.isError(() => assert.isArray(true))
      assert.isError(() => assert.isArray(false))
      assert.isError(() => assert.isArray(undefined))
      assert.isError(() => assert.isArray(null))
    })

    test('assert.isNull', () => {
      assert.isNull(null)
      assert.isError(() => assert.isNull(1))
      assert.isError(() => assert.isNull('1'))
      assert.isError(() => assert.isNull([]))
      assert.isError(() => assert.isNull({}))
      assert.isError(() => assert.isNull(true))
      assert.isError(() => assert.isNull(false))
      assert.isError(() => assert.isNull(undefined))
    })

    // 其他单元测试
    // ...
  })
}
