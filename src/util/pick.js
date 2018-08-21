/**
 * pick one or more element from list
 *
 * @flow
 */

import { random, repeat } from '../'

export default function pick<T>(num: number = 1,
                                arr: Array<T> = [],
                                unique?: boolean = true): Array<T> {
  if(num < 1) {
    throw new Error(
      `should pick more then one element, but got "num" was ${num}`
    )
  }

  const len = arr.length

  if(len < num) {
    throw new Error(
      `picked numner should less then array length, ${len} < ${num}`
    )
  }

  if(num === len) {
    return arr
  }

  if(1 === num) {
    return [arr[random(0, len - 1)]]
  }

  /**
   * gen array index, regenerate random number when "unique" was `true`
   */
  const idx = []

  repeat(num, () => {
    let gen = random(0, len - 1)

    if(!unique) {
      idx.push(gen)
      return
    }

    (function recur(next) {
      if(!Boolean(~idx.indexOf(next))) {
        idx.push(next)
        return
      }

      return recur(random(0, len - 1))
    })(gen)
  })

  /**
   * export
   */
  const coll = []

  for(let i = 0; i < idx.length; i++) {
    coll.push(arr[idx[i]])
  }

  return coll
}


/**
 * test
 */

import assert from 'assert'

describe('pick()', function() {
  it('should pick element from array', function() {
    assert(pick(3, [1, 2, 3, 4]).length === 3)
  })

  it('should pick element from only one array', function() {
    assert.deepStrictEqual(pick(1, ['foo']), ['foo'])
  })

  it('should pick element from array, number eq array length', function() {
    assert.deepStrictEqual(pick(2, ['foo', 'bar']), ['foo', 'bar'])
  })

  it('should pick element from array, number eq array length', function() {
    assert.deepStrictEqual(pick(2, ['foo', 'bar']), ['foo', 'bar'])
  })

  it('should pick element from array, uniqued', function() {
    const gen = pick(4, ['foo', 'bar', 'baz', 'qux', 'quxx'])
    for(let i = 0; i < gen.length; i++) {
      for(let j = i + 1; j < gen.length; j++) {
        assert(gen[i] !== gen[j])
      }
    }
  })
})
