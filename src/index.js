/**
 * faker
 *
 * @flow
 */

export function random(min = 0, max = Number.MAX_SAFE_INTEGER): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function repeat<R>(num: number = 1, func: ?number => R): R {
  for(let i = 0; i < num; i++) {
    func(i)
  }
}

export function pick<I>(num: number = 1, arr: Array<I> = [], unique?: boolean = true): Array<I> {
  const len = arr.length

  if(len < num) {
    throw new Error(
      'picked numner should less then array length'
    )
  }

  if(0 === len) {
    return []
  }

  if(1 === len) {
    return [arr[random(0, len - 1)]]
  }

  if(num === len) {
    return arr
  }

  /**
   * gen array index
   */
  const idx = []

  repeat(num, () => {
    let gen = random(0, len - 1)

    if(!unique) {
      idx.push(gen)
      return
    }

    (function recur(next = gen) {
      if(!Boolean(~idx.indexOf(next))) {
        idx.push(next)
        return
      }

      return recur(random(0, len - 1))
    })()
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

export function pickOne<T>(arr: Array<T>): T {
  return pick(1, arr)[0]
}





/**
 * test
 */

import assert from 'assert'

describe('random()', function() {
  it('should generate ramdon number', function() {
    repeat(10, () => assert(random()))
  })

  it('should generate ramdon number with min', function() {
    repeat(10, () => assert(random(42) >= 42))
  })

  it('should generate ramdon number with max', function() {
    repeat(10, () => assert(random(undefined, 42) <= 42))
  })

  it('should generate ramdon number with min and max', function() {
    repeat(10, () => assert(random(40, 42) <= 42 && random(40, 42) >= 40))
  })
})

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
})

describe('pick()', function() {
  it('should pick element from array', function() {
    assert(pick(3, [1, 2, 3, 4]).length === 3)
  })

  it('should pick element from empty array', function() {
    assert.deepStrictEqual(pick(0, []), [])
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
