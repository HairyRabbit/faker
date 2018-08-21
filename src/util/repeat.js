/**
 * repeat call function "n" times
 *
 * @flow
 */

export default function repeat<T>(num: number = 1, func: number => T): Array<T> {
  const acc = []

  for(let i = 0; i < num; i++) {
    acc.push(func(i))
  }

  return acc
}


/**
 * test
 */

import assert from 'assert'

describe('repeat()', function() {
  it('should repeat 10 times', function() {
    let counter = 0
    repeat(10, () => counter++)
    assert(counter === 10)
  })

  it('should exec 1 time', function() {
    let counter = 0
    repeat(undefined, () => counter++)
    assert(counter === 1)
  })

  it('should collect function call return values', function() {
    assert.deepStrictEqual(
      repeat(3, () => 42),
      [42, 42, 42]
    )
  })
})
