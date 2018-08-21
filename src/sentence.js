/**
 * random sentence
 *
 * @flow
 */

import { repeat, pick, oneof, range } from './'
import word from './word'

export type Options = {
  locale?: string
}

export default function sentence({ locale }: Options = {}) {
  const loc = locale || oneof(['en', 'zh'])

  if('en' === loc) {
    return repeat(oneof(range(8, 14)), () => word({ locale: loc }))
      .join(' ')
      .replace(/^([^])/, (_, a) => a.toUpperCase()) + '.'
  }

  return repeat(oneof(range(3, 15)), () => word({ locale: loc })).join('') + '。'
}


/**
 * test
 */

import assert from 'assert'

describe('random word', function() {
  it('should gen random word', function() {
    repeat(100, () => {
      const gen = sentence()
      assert(gen)
    })
  })
})
