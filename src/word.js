/**
 * random word
 *
 * @flow
 */

import { repeat, pick, oneof, minmax, createFaker } from './'
import letter from './letter'

const fake = createFaker('word', {
  en: {
    proc(_, { min, max, ...options }) {
      const len = minmax(3, 6, min, max)
      return repeat(len, () => letter({ upcase: false, ...options })).join('')
    }
  },
  zh: {
    db: 'require',
    proc(data, { min, max }) {
      const len = minmax(1, 4, min, max)
      return pick(len, data).join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random word', function() {
  it('should gen random word', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })

  it('should gen random word with locale options', function() {
    repeat(1e3, () => {
      const gen = fake({ locale: 'en' })
      assert(/[a-z]+/.test(gen))
      const gen2 = fake({ locale: 'zh' })
      assert(!/[a-z]+/.test(gen2))
    })
  })

  it('should gen random word with min options', function() {
    repeat(1e3, () => {
      const gen = fake({ min: 5 })
      assert(gen.length >= 5)
    })
  })

})
