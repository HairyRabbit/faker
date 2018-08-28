/**
 * random sentence
 *
 * @flow
 */

import { repeat, pick, oneof, range, minmax, createFaker } from './'
import word from './word'

export const sentenceMinWorkLength = 8
export const sentenceMaxWorkLength = 14

export const fake = createFaker('sentence', {
  en: {
    proc(_, { min, max, word: wordOptions = {}, ...options }) {
      const len = minmax(
        sentenceMinWorkLength,
        sentenceMaxWorkLength,
        min,
        max
      )

      return repeat(len, () => word({ ...wordOptions, ...options }))
        .join(' ')
        .replace(/^([^])/, (_, a) => a.toUpperCase()) + '.'
    }
  },
  zh: {
    proc(_, { min, max, word: wordOptions = {}, ...options }) {
      const len = minmax(
        sentenceMinWorkLength - 4,
        sentenceMaxWorkLength,
        min,
        max
      )
      return repeat(len, () => word({ ...wordOptions, ...options }))
        .join('') + '。'
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

  it('should gen random sentence, pass options to word', function() {
    repeat(1e3, () => {
      const gen = fake({ word: { min: 2, max: 2 } })
      assert(
        gen.slice(0, -1).split(' ')
          .filter(Boolean)
          .map(s => s.trim())
          .every(s => 2 === s.length)
      )
    })
  })
})
