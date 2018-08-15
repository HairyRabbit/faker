/**
 * gen float
 *
 * @flow
 */

import { repeat } from './'
import number from './number'

export type Options = {
  min?: number,
  max?: number,
  fixed?: number
}

export default function float({ min, max, fixed }: Options = {}): number {
  const gen = number({ min, max })

  if(!fixed) {
    return gen
  }

  return parseFloat(gen.toFixed(fixed))
}


/**
 * test
 */

import assert from 'assert'

describe('random float', function() {
  it('should gen random float', function() {
    repeat(100, () => {
      const gen = float()
      assert(gen)
      assert(typeof gen === 'number')
    })
  })

  it('should gen random float in range', function() {
    repeat(100, () => {
      const gen = float()
      assert(gen >= Number.MIN_SAFE_INTEGER && gen <= Number.MAX_SAFE_INTEGER)
      const gen2 = float({ min: 1, max: 2 })
      assert(gen2 >= 1 && gen2 <= 2)
    })
  })

  it('should gen random float fixed', function() {
    repeat(100, () => {
      const gen = float({ min: 0, max: 1, fixed: 3 })
      assert(gen.toString().length <= 5)
    })
  })
})
