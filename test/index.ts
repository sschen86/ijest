import http from 'http';
import ijest from 'ijest';

const { tests, run } = ijest<
  {
    name: 'shushu';
    httpServer: http.Server;
  },
  {
    isStringNumber: (v) => unknown;
  }
>({
  context: {
    name: 'shushu',
    httpServer: http.createServer((req, res) => {
      res.end('666');
    }),
  },
  assert: (assert) => ({
    isStringNumber(value) {
      assert.isString(value);
      assert.isMatch(value, /^\d+$/);
    },
  }),
  before(context) {
    // context.httpServer.listen();
  },
  after(context) {
    // context.httpServer.close();
  },
  
  //   count: 10
});

export default tests;

run();

// alias配置
// 1. babel，plugins下添加
// [
//   'module-resolver',
//   {
//     root: ['.'],
//     alias: {
//       '@ijest': './test/index.ts',
//     },
//   },
// ]
// 2. eslint，settings下添加
// 'import/resolver': {
//   alias: {
//     map: [
//       ['@ijest', './test/index.ts'],
//     ],
//     extensions: ['.js', '.ts', '.json '],
//   },
//   node: {
//     extensions: ['.js', '.ts', '.json'],
//   },
// }
// 3. tsconfig.json 添加
// "paths": {
//   "@ijest":["index.ts"],
// }
