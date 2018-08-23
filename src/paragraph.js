/**
 * random paragraph
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'
import sentence from './sentence'

const fake = createFaker('paragraph', {
  en: {
    proc(_, { min, max, ...options }) {
      const len = minmax(3, 18, min, max)
      return repeat(len, () => sentence(options)).join(' ')
    }
  },
  zh: {
    proc(_, { min, max, ...options }) {
      const len = minmax(5, 20, min, max)
      return repeat(len, () => sentence(options)).join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random paragraph', function() {
  it('should gen random paragraph', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })
})
