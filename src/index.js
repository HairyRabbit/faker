/**
 * faker
 *
 * @flow
 */

/**
 * exports
 */

/**
 * basic
 */
export { default as boolean } from './boolean'
export { default as number } from './number'
export { default as float } from './float'

/**
 * text
 */
export { default as char } from './char'
export { default as word } from './word'
export { default as sentence } from './sentence'
export { default as paragraph } from './paragraph'

/**
 * person
 */
export { default as firstname } from './firstname'
export { default as lastname } from './lastname'
export { default as fullname } from './fullname'

/**
 * others
 */
export { default as avatar } from './avatar'


/**
 * utils
 */

export function random(min: number = 0, max: number = Number.MAX_SAFE_INTEGER, floor?: boolean = true): number {
  if(floor) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return Math.random() * (max - min) + min
}

const seeds = new Map()

export function seed<K>(key: K) {
  const val = seeds.get(key)

  return function seed1(min?: number, max?: number, floor?: boolean): number {
    if(val) {
      return val
    }

    const gen = random(min, max, floor)
    seeds.set(key, gen)
    return gen
  }
}


export function repeat<R>(num: number = 1, func: number => R): Array<R> {
  const acc = []
  for(let i = 0; i < num; i++) {
    acc.push(func(i))
  }
  return acc
}

export function pick<I>(num: number = 1, arr: Array<I> = [], unique?: boolean = true): Array<I> {
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
   * gen array index
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

export function oneof<T>(arr: Array<T>): T {
  return pick(1, arr)[0]
}

export function range(from: number, to: number): Array<Number> {
  return Array(to - from + 1).fill(1).map((_, idx) => idx + from)
}

export type ChooseOptions = {
  test?: string | RegExp,
  include?: Array<string>,
  exclude?: Array<string>
}

export function choose({ test, include = [], exclude = [] }: ChooseOptions = {}) {
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


/**
 * types
 */

export type Locale =
  | 'en'
  | 'zh'


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

  it('should collect function call return values', function() {
    assert.deepStrictEqual(
      repeat(3, () => 42),
      [42, 42, 42]
    )
  })
})

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

describe('seed()', function() {
  it(`should return value with same seed`, function() {
    const key = random()
    assert(seed(key)() === seed(key)())
  })
})
