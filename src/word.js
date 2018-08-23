/**
 * random word
 *
 * @flow
 */

import { repeat, pick, oneof, range, minmax, createFaker, type Options as FakerOptions } from './'
import letter from './letter'

export type Options = {
  min?: number,
  max?: number
} & FakerOptions<string>

const fake = createFaker('word', {
  en: {
    proc(_, { min, max }) {
      const len = minmax(3, 6, min, max)
      return repeat(len, () => letter({ upcase: false })).join('')
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

// export default function word({ locale, min, max, ...options }: Options = {}): string {
//   const loc = locale || oneof(['en', 'zh'])

//   if('en' === loc) {
//     const len = minmax(3, 6, min, max)
//     return repeat(len, () => letter({ upcase: false, ...options })).join('')
//   }

//   const len = minmax(1, 4, min, max)
//   const fake = createFaker({ name: 'word' })
//   return repeat(len, () => fake({ locale: loc, ...options })).join('')
// }


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
    repeat(100, () => {
      const gen = fake({ min: 5 })
      assert(gen.length >= 5)
    })
  })

})
