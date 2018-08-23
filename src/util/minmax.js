/**
 * random a number with min and max by default min/max
 *
 * @flow
 */

import { oneof, range } from '../'

export default function minmax(dmin: number, dmax: number, min?: number = dmin, max?: number = dmax): number {
  let num

  if(min >= dmax) {
    num = min
  } else if(max <= dmin) {
    num = max
  }

  if(num) {
    return num
  }

  return oneof(range(min || dmin, max || dmax))
}


/**
 * test
 */

import assert from 'assert'

describe('minmax()', function() {
  it('should gen number between min and max', function() {
    const gen = minmax(1, 10)
    assert(gen >= 1 && gen <= 10)
  })

  it('should gen number between min and max, override min', function() {
    const gen = minmax(1, 10, 3)
    assert(gen >= 3 && gen <= 10)
  })

  it('should gen number between min and max, override max', function() {
    const gen = minmax(1, 10, undefined, 20)
    assert(gen >= 1 && gen <= 20)
  })

  it('should gen number between min and max, override min and max', function() {
    const gen = minmax(1, 10, 5, 20)
    assert(gen >= 5 && gen <= 20)
  })

  it('should gen number between min and max, overload max with min', function() {
    const gen = minmax(1, 10, 20)
    assert(gen === 20)
  })

  it('should gen number between min and max, overload min with max', function() {
    const gen = minmax(10, 20, undefined, 5)
    assert(gen === 5)
  })
})
