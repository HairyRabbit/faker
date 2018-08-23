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

export default function choose<T>({ test,
                                    include = [],
                                    exclude = [] }: Options<T> = {}): Array<T> => Array<T> {
  const call = test
    ?(test instanceof RegExp
      ? (a => test.test(String(a)))
      : (a => a === test))
        : (a => true)

  return function choose1(collects: Array<T>): Array<T> {
    return collects
      .filter(item => call(item) && !Boolean(~exclude.indexOf(item)))
      .concat(include)
  }
}


/**
 * test
 */

import * as assert from 'assert'

describe('choose()', function() {
  it('should not change data', function() {
    const expected = choose()([1, 2, 3])
    assert.deepStrictEqual(expected, [1, 2, 3])
  })

  it('should change data with test options', function() {
    const expected = choose({ test: /^ba/ })(['foo', 'bar', 'baz'])
    assert.deepStrictEqual(expected, ['bar', 'baz'])
  })

  it('should change data with include options', function() {
    const expected = choose({ include: ['qux'] })(['foo', 'bar', 'baz'])
    assert.deepStrictEqual(expected, ['foo', 'bar', 'baz', 'qux'])
  })

  it('should change data with exlcude options', function() {
    const expected = choose({ exclude: ['bar'] })(['foo', 'bar', 'baz'])
    assert.deepStrictEqual(expected, ['foo', 'baz'])
  })

  it('should change data with generic type data', function() {
    const ref = { id: 1, value: 'foo' }
    const expected = choose({ exclude: [ref] })([
      ref,
      { id: 2, value: 'bar' },
      { id: 3, value: 'baz' }
    ])
    assert.deepStrictEqual(expected, [
      { id: 2, value: 'bar' },
      { id: 3, value: 'baz' }
    ])
  })
})
