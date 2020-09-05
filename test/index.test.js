import http from 'http'
import ijest from '../index'
import assert from './children/assert'

const context = {
  name: 'shushu',
  getName () {
    return this.name
  },
  httpServer: http.createServer((req, res) => {
    res.end('666')
  }),
}

ijest({
  tests: {
    context ({ name, getName }, { tests, test, assert }) {
      tests('ijest.context', () => {
        test('context.attr', () => {
          assert.isBe(name, context.name)
        })
        test('context.method', () => {
          assert.isBe(getName, context.getName)
        })
      })
    },
    asserts (context, { tests, test, assert }) {
      tests('ijest.asserts', () => {
        test('asserts.isCustom', () => {
          assert.isFunction(assert.isCustom)
          assert.isCustom(true, true)
        })
      })
    },
    before ({ httpServer }, { tests, test, assert }) {
      tests('ijest.before, ijest.after', () => {
        test('context.server', () => {
          assert.isObject(httpServer)
          assert.isTrue(httpServer.listening)
        })
      })
    },
    test (ctx, { tests, test, assert }) {
      tests('runUtil.test', () => {
        test('runUtil.test(testTitle, testValue, testAssertsCall)', 8, (value) => {
          assert.isBe(value, 8)
        })
        let num = 0
        test('runUtil.test(testTitle, testValueGetter, testAssertsCall, callNum)', () => Math.random(), (value) => {
          assert.isNumber(value)
          assert.isTrue(value >= 0)
          assert.isTrue(value < 1)
          num++
        }, 9)

        test('runUtil.test(testTitle, testValueGetter, testAssertsCall)', () => {}, () => {
          assert.isBe(num, 9)
        })

        test('runUtil.test(testTitle, value, ...)', () => {
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(true)
            }, 100)
          }).then((result) => {
            assert.isTrue(result)
          })
        })
      })
    },
    assert,
  },
  context,
  asserts: {
    isCustom (value1, value2, assert) {
      assert.isTrue(value1)
      assert.isFalse(!value2)
    },
  },
  before (context) {
    context.httpServer.listen()
  },
  after ({ httpServer }) {
    httpServer.close()
  },
})
