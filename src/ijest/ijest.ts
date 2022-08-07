import requireGlob from 'require-glob';

// import args from './args';
import presetAssert from './assert';
import { PresetAssert } from './assert/index.types';
import { IjestOption } from './ijest.types';

export default function ijest<Context = unknown, CustomAssert = unknown>({
  count = 1,
  before,
  after,
  context,
  assert,
}: IjestOption<Context, CustomAssert>) {
  const runContext: Context = {} as null;
  const runAssert: PresetAssert & CustomAssert = {
    ...presetAssert,
  } as null;

  if (context && typeof context === 'object') {
    Object.assign(runContext, context);
  }

  if (typeof assert === 'function') {
    Object.assign(runAssert, assert(runAssert, runContext));
  }

  if (typeof before === 'function') {
    beforeAll(() => before(runContext));
  }

  if (typeof after === 'function') {
    afterAll(() => after(runContext));
  }

  let isRunning = false;

  return { run, tests, context: runContext, assert: runAssert };

  function run(path = `./test/tests`) {
    if (isRunning) {
      return;
    }

    isRunning = true;
    requireGlob.sync(path, { cwd: process.cwd() });
  }

  function tests(
    groupTitle: string,
    define: (
      test: (
        name: string,
        callback: (ctx: Context) => ReturnType<jest.It>
      ) => void,
      assert: PresetAssert & CustomAssert,
      ctx: Context
    ) => void,
    timeout?: number
  ) {
    describe(groupTitle, () => {
      define(
        (name, callback) =>
          it(
            name,
            () => {
              if (count === 1) {
                return callback(runContext);
              }

              const all = [];
              for (let i = 0; i < count; i++) {
                all.push(callback(runContext));
              }

              return Promise.all(all);
            },
            timeout
          ),
        runAssert,
        runContext
      );
    });
  }
}
