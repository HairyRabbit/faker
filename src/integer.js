/**
 * random natural
 *
 * @flow
 */

import { repeat } from './'
import number from './number'

export type Options = {
  min?: number,
  max?: number
}

export default function integer({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER }: Options = {}): number {
  return number({ min, max, float: false })
}


/**
 * test
 */

import assert from 'assert'

describe('random integer', function() {
  it('should gen random float', function() {
    repeat(100, () => {
      const gen = integer()
      assert(gen)
      assert(typeof gen === 'number')
    })
  })

  it('should gen random integer in range', function() {
    repeat(100, () => {
      const gen = integer()
      assert(gen >= Number.MIN_SAFE_INTEGER && gen <= Number.MAX_SAFE_INTEGER)
      const gen2 = integer({ min: 1, max: 2 })
      assert(gen2 >= 1 && gen2 <= 2)
    })
  })
})
