export interface PresetAssert {
  isTrue: (value) => void;
  isFalse: (value) => void;
  isTruly: (value) => void;
  isFalsy: (value) => void;
  isBoolean: (value) => void;
  isFunction: (value) => void;
  isArray: (value) => void;
  isNull: (value) => void;
  isUndefined: (value) => void;
  isNumber: (value) => void;
  isObject: (value) => void;
  isString: (value) => void;
  isEqual: (value1, value2) => void;
  isBe: (value1, value2) => void;
  isLength: (value, min: number, max: number) => void;
  isMatch: (value, regexp: RegExp) => void;
  isBelong: (value, list: Array<any>) => void;
  isError: (error: (() => unknown) | Error) => void;
}
