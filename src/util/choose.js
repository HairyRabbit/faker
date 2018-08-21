/**
 * choose list elements, with `test`, `include`, `exclude` options
 *
 * @flow
 */

export type Options<T> = {
  test?: T | RegExp,
  include?: Array<T>,
  exclude?: Array<T>
}

export default function choose<T>({ test, include = [], exclude = [] }: Options<T> = {}) {
  const call = test
    ?(test instanceof RegExp
      ? (a => test.test(String(a)))
      : (a => a === test))
        : (a => true)

  return function choose1(collects: Array<T>): Array<T> {
    return collects
      .filter(item => call(item) && Boolean(!~exclude.indexOf(item)))
      .concat(include)
  }
}
