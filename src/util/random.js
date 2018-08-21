/**
 * generate random number
 *
 * @flow
 */

import { repeat } from '../'

export default function random(min: number = 0,
                               max: number = Number.MAX_SAFE_INTEGER,
                               floor?: boolean = true): number {
  if(floor) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  return Math.random() * (max - min) + min
}


/**
 * test
 */

import assert from 'assert'

describe('random()', function() {
  it('should generate ramdon number', function() {
    repeat(1e3, () => {
      const gen = random()
      assert(gen)
      assert('number' === typeof gen)
    })
  })

  it('should generate ramdon number gte min', function() {
    repeat(1e3, () => {
      assert(random(42) >= 42)
    })
  })

  it('should generate ramdon number lte max', function() {
    repeat(1e3, () => {
      assert(random(undefined, 42) <= 42)
    })
  })

  it('should generate ramdon number with min and max', function() {
    repeat(1e3, () => {
      assert(random(40, 42) <= 42 && random(40, 42) >= 40)
    })
  })

  it('should generate ramdon number without floor', function() {
    for(let i = 0; i < 1e3; i++) {
      const gen = random(40, 42, true)
      if(gen.toString().indexOf('.')) {
        assert(true)
        return
      }
    }

    assert(false)
  })
})
