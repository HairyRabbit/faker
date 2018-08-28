/**
 * random paragraph
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'
import sentence from './sentence'

export const paragraphMinSentenceLength = 5
export const paragraphMaxSentenceLength = 16

export const fake = createFaker('paragraph', {
  en: {
    proc(_, { min, max, sentence: sentenceOptions = {}, ...options }) {
      const len = minmax(
        paragraphMinSentenceLength,
        paragraphMaxSentenceLength,
        min,
        max
      )

      return repeat(len, () => sentence({ ...sentenceOptions, ...options })).join(' ')
    }
  },
  zh: {
    proc(_, { min, max, sentence: sentenceOptions = {}, ...options }) {
      const len = minmax(
        paragraphMinSentenceLength,
        paragraphMaxSentenceLength,
        min,
        max
      )

      return repeat(len, () => sentence({ ...sentenceOptions, ...options })).join('')
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

  it('should gen random paragraph, pass options to sentence', function() {
    repeat(1e3, () => {
      const gen = fake({ sentence: { min: 2, max: 2 } })
      assert(
        gen.split('.')
          .filter(Boolean)
          .map(s => s.trim().split(' '))
          .every(s => s.length === 2)
      )
    })
  })
})
