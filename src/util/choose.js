/**
 * choose list elements, with `test`, `include`, `exclude` options
 *
 * @flow
 */

export type Options = {
  test?: string | RegExp,
  include?: Array<string>,
  exclude?: Array<string>
}

export default function choose({ test, include = [], exclude = [] }: Options = {}) {
  const call = test
        ? ('string' === typeof test
           ? (a => a === String(test))
           : (a => test.test(a)))
        : (a => true)

  return function choose1(collects: Array<string>): Array<string> {
    return collects
      .filter(item => call(item) && Boolean(!~exclude.indexOf(item)))
      .concat(include)
  }
}
