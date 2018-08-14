/**
 * random number
 *
 * @flow
 */

import { random, repeat } from './'

export default function number(min?: number = Number.MIN_SAFE_INTEGER, max?: number = Number.MAX_SAFE_INTEGER, float?: boolean = true): number {
  return random(min, max, !float)
}


/**
 * test
 */

import assert from 'assert'

describe('random number', function() {
  it('should gen random number', function() {
    repeat(10, () => {
      const gen = number()
      assert(
        gen >= Number.MIN_SAFE_INTEGER && gen <= Number.MAX_SAFE_INTEGER
      )
    })
  })

  it('should gen random number within range', function() {
    repeat(10, () => {
      const min = -100
      const max = +100
      const gen = number(min, max)
      assert(gen >= min && gen <= max)
    })
  })
})
