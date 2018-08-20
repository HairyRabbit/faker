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

/**
 * number
 */
export { default as float } from './float'
export { default as integer } from './integer'
export { default as natural } from './natural'

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

export function pick<T>(num: number = 1, arr: T | Array<T> = [], unique?: boolean = true): Array<T> {
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

export function oneof<T>(arr: string | Array<T>): T {
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

export type Options<T> = {
  locale?: Locale,
  weight?: Array<[T, number]>,
  test?: T | RegExp,
  include?: Array<T>,
  exlcude?: Array<T>,
  times?: number
}

export type CreateOptions<T, O> = {
  name: string,
  selector?: ((DB<T>, O) => (Array<T> | [Array<T>, (Array<T> => Array<T>)])),
  db?: DB<T>
}

export type DB<T> =
  | Array<T>
  | {
    [key: string]: DB
  }

export function createFaker<T, O>({ name, db, selector = a => a }) {

  // const context = require.context('../data', true, /\.json$/)
  // const locales = context.keys().reduce((acc, curr) => {
  //   acc.push(curr.match(/^\.\/(\w+)\//)[1])
  //   return acc
  // }, [])

  const locales = ['en', 'zh']

  return function createFaker1(options: O = {}): T {
    const { locale, weight, test, include, exclude } = options

    let data = db

    if(!db) {
      if(locale) {
        if(Boolean(!~locales.indexOf(locale))) {
          throw new Error(
            `locale "${locale}" not supports, should one of ${locales.toString()}`
          )
        }
      }

      const loc = locale || oneof(locales)
      data = require(`../data/${loc}/${name}.json`)
    } else {
      if(!Array.isArray(db)) {
        if(!locale) {
          const loc = locale || oneof(locales)
          if(db[loc]) {
            data = db[loc]
          }
        }
      }
    }

    /**
     * select sub set
     */
    const res = selector(data, options)

    let proc = oneof

    if(res.data) {
      data = res.data
      proc = res.proc
    } else {
      data = res
    }

    /**
     * apply choose, ensure more then one element in the dataset.
     */
    data = choose({ test, include, exclude })(data)

    if(0 === data.length) {
      throw new Error(
        `Dataset haven't any element, ${data.toString()}`
      )
    }


    if(weight) {
      if(weight.length > data.length) {
        throw new Error(
          `The weight set length should less then data set`
        )
      }

      const sum = weight.reduce((a, c) => a + c[1], 0)
      if(sum > 1) {
        throw new Error(
          `Sum weight should less then 1`
        )
      }

      const [ we ] = weight.reduce(([acc, curr], [key, val]) => {
        const next = curr + val

        acc.push({
          key,
          val,
          left: curr,
          right: next
        })

        return [acc, next]
      }, [[], 0])

      const gen = random(0, 1, false)
      const ma = we.find(w => gen >= w.left && gen < w.right)

      if(ma) {
        const key = ma.key

        if(Boolean(!~data.indexOf(key))) {
          throw new Error(
            `The weight key ${key} not exists in data set.`
          )
        }

        return ma.key
      }

      const keys = weight.map(w => w[0])
      data = choose({ exclude: keys })(data)
    }

    return proc(data)
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
