# ijest
封装jest测试工具，提供了更加快捷和语义化的断言，支持指定测试单一模块

### 安装使用

```
yarn add ijest
```
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
    before(context){
        // 初始化一些东西
    },

    // 测试结束后运行
    after(context){
        // 清理东西
    },

    // 所有测试用例
    tests: {
        // testId: function(context, ijest){  }

        // 添加一个测试用例
        myTest: function(context, systemAPI){

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

        otherTest: require('./otherTest')

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


### API

#### ijest

ijest(option) 声明一个测试对象

#### option

+ option.context 执行上下文，在此处注入环境中需要的对象
+ option.tests 定义各种测试用例，可以通过指令 jest -a=key1,key2... 单独运行多个测试用例
+ option.asserts 自定义定义断言，用于测试环境中调用
+ option.defaultNum 定义每个单元测试运行的测试，这个对应测试一些随机函数和有用，比如类似`@smartx/mock-value`


#### tests测试用例下的context为option传入的对象

#### tests测试用例下的systemAPI为系统内部导出的API

+ systemAPI.tests(groupName, testFn) 声明一组测试
+ systemAPI.test(testDescription, testValueGetter, testAsserts) 声明一个单元测试
+ systemAPI.test(testDescription, testAsserts) 声明一个单元测试，没有testValueGetter，异步的测试可以返回一个promise对象
+ systemAPI.asserts 断言API，内置很多断言方法，包括系统内置的和通过`option.asserts`自定义的断言


#### systemAPI.asserts系统内置断言

+ asserts.isTrue(value)  值是否为true
+ asserts.isFalse(value) 值是否为false
+ asserts.isTruly(value) 值是否可以转化为true
+ asserts.isFalsy(value) 值是否可以转化为false
+ asserts.isBoolean(value) 值是否是布尔值
+ asserts.isFunction(value) 值是否是函数
+ asserts.isArray(value) 值是否是数组
+ asserts.isNull(value) 值是否是null
+ asserts.isNumber(value) 值是否是数字，不包含NaN
+ asserts.isObject(value) 值是否是对象，不包括null
+ asserts.isString(value) 值是否是字符串
+ asserts.isEqual(value1, value2) 值是否相等，2个有相同key，value的对象可以使用该方法
+ asserts.isBe(value1, value2)  值恒等，对象比的是引用
+ asserts.isLength(value, length)  值的长度是否等于length
+ asserts.isLength(value, min, max)  值的长度是否属于[min,max]区间
+ asserts.isMatch(value, regexp)  值是否被regexp匹配，允许数字和字符串
+ asserts.isBelong(value, array)  值是否属于array


### 异步的测试

```js

module.exports = function(context, { tests, test, asserts }){

    tests('第一组测试', function(){

        test('异步的测试', function(){

            return new Promise((resolve, reject) => {
                setTimeout(function(){
                    assert.isTrue(true)
                    resolve()
                }, 100)
            })

        })
    })

}
```