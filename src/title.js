/**
 * random title
 *
 * @flow
 */

import { repeat, pick, oneof, range, minmax, createFaker } from './'
import word from './word'

export const titleMinWorkLength = 8
export const titleMaxWorkLength = 14

const fake = createFaker('title', {
  en: {
    proc(_, { min, max, word: wordOptions = {}, ...options }) {
      const len = minmax(
        titleMinWorkLength,
        titleMaxWorkLength,
        min,
        max
      )
      return repeat(len, () => word({ ...wordOptions, ...options }))
        .join(' ')
        .replace(/^([^])/, (_, a) => a.toUpperCase())
    }
  },
  zh: {
    proc(_, { min, max, word: wordOptions = {}, ...options }) {
      const len = minmax(
        titleMinWorkLength - 4,
        titleMaxWorkLength,
        min,
        max
      )
      return repeat(len, () => word({ ...wordOptions, ...options }))
        .join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random title', function() {
  it('should gen random title', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })
})
