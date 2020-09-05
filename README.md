# ijest
封装jest测试工具，提供了更加快捷和语义化的断言，支持指定测试单一模块

### 安装使用

```
yarn add ijest
```

执行指定的测试用例，多个用逗号隔开
```
jest -a = key1, key2, key3  
```
> 只运行key1,key2,key3这3个测试用例

```js
const ijest = require('ijest')

ijest({
  // 上下文环境
  context: {
    // 在此处定义环境变量，引入待测试的库，引入辅助工具等
  },

  // 测试开始前运行
  before (context) {
    // 初始化一些东西
  },

  // 测试结束后运行
  after (context) {
    // 清理东西
  },

  // 所有测试用例
  tests: {
    // testId: function(context, ijest){  }

    // 添加一个测试用例
    myTest: function (context, { tests, test, assert }) {
      // 定义测试分组
      tests('groupName', () => {
        // 定义一个单元测试，test(testDescription, testValueGetter, testAsserts)
        test('test info', () => returnValue(), value => {
          // 执行各种断言
          assert.isString(value)
        })
      })
    },

    utils: function ({ utils }, { tests, test, assert }) {
      tests('utils', () => {
        // 执行多次测试
        test('utils.getName()', () => utils.getName(), value => {
          assert.isString(value)
          assert.isLength(value, 2)
          assert.isBe(value, 'xx')
          assert.isString2(value)
        })

        test('utils.setName(name)', utils.setName('za'), value => {
          assert.isString(value)
          assert.isBe(value, 'za')
        })
      })
    },

    otherTest: require('./otherTest'),

    // ... 更多测试用例，可以使用命令行工具jest -a=utils,otherTest运行指定的测试，而非全部
  },

  // 自定义断言
  asserts: {
    // 定义来一个判断值是否是长度为2的字符串断言，可以在测试中使用
    isString2 (value) {
      expect(typeof value).toBe('string')
      expect(value.length).toBe(2)
    },
  },

  // 自定义多次执行测试的次数
  defaultNum: 20,
})
```



### 初始化测试环境

ijest(option)

##### 参数option

+ option.context 执行上下文，在此处注入环境中需要的对象
+ option.tests 定义各种测试用例，可以通过指令 jest -a=key1,key2... 单独运行多个测试用例
+ option.asserts 自定义定义断言，用于测试环境中调用
+ option.defaultNum 定义每个单元测试运行的测试，这个对应测试一些随机函数和有用，比如类似`@shushu.pro/mockv`

### 定义测试用例

#### tests.myTest(context, runUtil)

#### context

同option.context

#### runUtil

测试运行过程中可用的工具类

+ runUtil.tests(testsName, testsDefine) 定义一组测试
+ runUtil.test(testTitle, testValue, testAssertsCall) 定义一个单元测试
+ runUtil.test(testTitle, testValueGetter, testAssertsCall, callNum) 定义一个测试随机数的单元测试
+ runUtil.test(testTitle, testValue, ...) 使用标准的方法定义一个单元测试
+ runUtil.assert 断言API，内置很多断言方法，包括系统内置的和通过`option.asserts`自定义的断言


#### runUtil.assert系统内置断言

+ assert.isTrue(value)  值是否为true
+ assert.isFalse(value) 值是否为false
+ assert.isTruly(value) 值是否可以转化为true
+ assert.isFalsy(value) 值是否可以转化为false
+ assert.isBoolean(value) 值是否是布尔值
+ assert.isFunction(value) 值是否是函数
+ assert.isArray(value) 值是否是数组
+ assert.isNull(value) 值是否是null
+ assert.isNumber(value) 值是否是数字，不包含NaN
+ assert.isObject(value) 值是否是对象，不包括null
+ assert.isString(value) 值是否是字符串
+ assert.isEqual(value1, value2) 值是否相等，2个有相同key，value的对象可以使用该方法
+ assert.isBe(value1, value2)  值恒等，对象比的是引用
+ assert.isLength(value, length)  值的长度是否等于length
+ assert.isLength(value, min, max)  值的长度是否属于[min,max]区间
+ assert.isMatch(value, regexp)  值是否被regexp匹配，允许数字和字符串
+ assert.isBelong(value, array)  值是否属于array

### 自定义断言

asserts.myAssert(value, ..., assert)

#### 示例
```js
asserts: {
  isName(value, assert){
    assert.isString(value) // 使用已定义的断言
    expect(value).toBe(6) // 使用原生的断言
  }
}
tests: {
    myTest(context, {tests, test, assert}){
        tests('my-group-test', () => {
            test('my-test', () => {
                assert.isName(6) // 使用自定义断言
            })
        })
    }
}
```


### 异步的测试

```js
module.exports = function (context, { tests, test, assert }) {
  tests('第一组测试', function () {
    test('异步的测试', function () {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          assert.isTrue(true)
          resolve()
        }, 100)
      })
    })
    test('异步测试2', () => {
      return Promise.all([
        Promise.resolve(1),
        Promise.resove(2),
      ])
    })
  })
}
```