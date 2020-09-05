const assert = require('./assert')

module.exports = function testUtil ({ defaultNum }) {
  return {
    assert,
    tests (title, groupTestCall) {
      describe(`\n=== ${title} ===`, groupTestCall)
    },
    test (title, value, assertsCall, num) {
      // 对value进行一次测试
      // test(title, value, assertsCall)
      if (typeof value !== 'function' && typeof assertsCall === 'function') {
        return test(title, () => {
          assertsCall(value)
        })
      }

      // 对value返回值进行多次测试，一般用于结果是随机值的情况
      // test(title, valueGetter, assertsCall, num) 对valueGetter返回的值进行多次测试
      if (typeof value === 'function' && typeof assertsCall === 'function') {
        return test(title, () => {
          num = num || defaultNum
          for (let i = 0; i < num; i++) {
            assertsCall(value())
          }
        })
      }

      // 使用原生的方式进行测试，一般在场景比较复杂的时候使用
      //  test(title, assertsCall)
      if (typeof value === 'function' && typeof assertsCall !== 'function') {
        return test(title, value, assertsCall)
      }

      throw Error('arguments error!')
    },
  }
}
