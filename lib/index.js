const testUtil = require('./test-util')
const parseArgv = require('./parse-argv')


function ijest ({ before, after, context = {}, tests = {}, asserts = {}, actives, defaultNum = 10 }) {
  const runContext = { ijest } // 运行环境
  const runUtil = {} // 运行工具包

  if (typeof before === 'function') {
    beforeAll(() => before(runContext))
  }
  if (typeof after === 'function') {
    afterAll(() => after(runContext))
  }
  Object.assign(runContext, context)

  initArgs()
  initTestUtil()
  initAsserts()
  startTest()

  // 初始化运行参数
  function initArgs () {
    const { a, n } = parseArgv()
    // 激活的测试
    if (a && a.value[0]) {
      actives = a.value
    } else if (actives && typeof actives === 'string') {
      actives = actives.split(/\s*,\s*/)
    } else {
      actives = null
    }

    // 设置多次执行次数
    if (n && n.value[0] > 0) {
      defaultNum = Number(n.value[0])
    }
  }

  // 初始化自定义断言
  function initAsserts () {
    const { assert } = runUtil
    for (const key in asserts) {
      if (key in assert) {
        throw Error(`系统中已存在assert.${key}`)
      }
      assert[key] = (...args) => asserts[key](...args, assert)
    }
  }

  // 初始化测试工具
  function initTestUtil () {
    Object.assign(runUtil, testUtil({
      defaultNum,
    }))
  }

  // 启动测试
  function startTest () {
    for (const key in tests) {
      if (!actives || actives.includes(key)) {
        tests[key]({ ...runContext }, runUtil)
      }
    }
  }
}

module.exports = ijest
