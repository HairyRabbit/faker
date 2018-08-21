/**
 * random paragraph
 *
 * @flow
 */

import { repeat, pick, oneof, range } from './'
import sentence from './sentence'

export type Options = {
  locale?: string
}

export default function paragraph({ locale }: Options = {}) {
  const loc = locale || oneof(['en', 'zh'])

  const gen = repeat(oneof(range(3, 18)), () => sentence({ locale: loc }))

  if('en' === loc) {
    return gen.join(' ')
  }

  return gen.join('')
}


/**
 * test
 */

import assert from 'assert'

describe('random sentence', function() {
  it('should gen random word', function() {
    repeat(100, () => {
      const gen = paragraph()
      assert(gen)
    })
  })
})
