import { PresetAssert } from './assert/index.types';

/** @description ijest配置项 */
export interface IjestOption<Context = unknown, CustomAssert = unknown> {
  /** @description 测试执行次数 */
  count?: number;

  /** @description 执行测试前的钩子 */
  before?: (context: Context) => void;

  /** @description 执行测试后的钩子 */
  after?: (context: Context) => void;

  /** @description 上下文环境 */
  context?: Context;

  /** @description 断言扩展 */
  assert?: (
    assert: PresetAssert & CustomAssert,
    context: Context
  ) => CustomAssert;
}
