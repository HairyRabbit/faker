/**
 * random sentence
 *
 * @flow
 */

import { repeat, pick, oneof, range, minmax, createFaker } from './'
import word from './word'

const fake = createFaker('sentence', {
  en: {
    proc(_, { min, max, ...options }) {
      const len = minmax(8, 14, min, max)
      return repeat(len, () => word(options))
        .join(' ')
        .replace(/^([^])/, (_, a) => a.toUpperCase()) + '.'
    }
  },
  zh: {
    proc(_, { min, max, ...options }) {
      const len = minmax(3, 15, min, max)
      return repeat(len, () => word(options)).join('') + '。'
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random sentence', function() {
  it('should gen random sentence', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })
})
