/**
 * random number
 *
 * @flow
 */

import { random, repeat } from './'

export type Options = {
  min?: number,
  max?: number,
  float?: boolean
}

export default function number({ min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER, float = true }: Options = {}): number {
  return random(min, max, !float)
}


/**
 * test
 */

import assert from 'assert'

describe('random number', function() {
  it('should gen random number', function() {
    repeat(100, () => {
      const gen = number()
      assert(gen)
      assert(typeof gen === 'number')
      assert(gen >= Number.MIN_SAFE_INTEGER && gen <= Number.MAX_SAFE_INTEGER)
    })
  })

  it('should gen random number in range', function() {
    repeat(100, () => {
      const min = 1
      const max = 2
      const gen = number({ min, max })
      assert(gen >= min && gen <= max)
    })
  })
})
