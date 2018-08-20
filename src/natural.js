/**
 * random natural
 *
 * @flow
 */

import { repeat } from './'
import integer from './integer'

export type Options = {
  min?: number,
  max?: number
}

export default function natural({ min = 1, max = Number.MAX_SAFE_INTEGER }: Options = {}): number {
  return integer({ min, max })
}


/**
 * test
 */

import assert from 'assert'

describe('random natural', function() {
  it('should gen random float', function() {
    repeat(100, () => {
      const gen = natural()
      assert(gen)
      assert(typeof gen === 'number')
    })
  })

  it('should gen random natural in range', function() {
    repeat(100, () => {
      const gen = natural()
      assert(gen >= 1 && gen <= Number.MAX_SAFE_INTEGER)
      const gen2 = natural({ min: 1, max: 2 })
      assert(gen2 >= 1 && gen2 <= 2)
    })
  })
})
