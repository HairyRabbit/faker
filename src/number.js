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

export default function number({ min = Number.MIN_VALUE, max = Number.MAX_VALUE, float = true }: Options = {}): number {
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
      assert(gen >= Number.MIN_VALUE && gen <= Number.MAX_VALUE)
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
