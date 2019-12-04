
const ijest = require('../')


ijest({

    // 上下文环境
    context: {
        utils: {
            getName () {
                return 'xx'
            },
            setName (name) {
                return name
            },
        },
        obx: {
            pp () {
                return 1
            },
        },
        mm: {
            pp () {
                return 1
            },
        },
    },

    // 所有测试用例
    tests: {
        // testId: function(context, ijest){  }

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
        obx: function ({ obx }, { tests, test, assert }) {
            tests('obx', () => {
                // 执行一次测试
                test('obx.pp()', obx.pp(), value => {
                    assert.isNumber(value)
                })
            })
        },
        mm: function ({ mm }, { tests, test, assert }) {
            tests('mm', () => {
                test('mm.pp()', () => {
                    const value1 = mm.pp()
                    assert.isNumber(value1)

                    const value2 = mm.pp()
                    assert.isNumber(value2)

                    assert.isBe(value1, value2)
                })
            })
        },
    },

    // 自定义断言
    asserts: {
        isString2 (value) {
            expect(typeof value).toBe('string')
            expect(value.length).toBe(2)
        },
    },

    // 自定义多次执行测试的次数
    defaultNum: 20,
})
