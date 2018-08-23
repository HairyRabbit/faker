/**
 * random string
 *
 * @flow
 */

import { repeat, minmax, type Options as FakerOptions } from './'
import letter from './letter'
import boolean from './boolean'

export type Options = {
  min?: number,
  max?: number,
} & FakerOptions<string>

export default function string({ min, max, ...options }: Options = {}) {
  const len = minmax(4, 16, min, max)

  return repeat(len, () => letter({ upcase: boolean(), ...options })).join('')
}


/**
 * test
 */

import assert from 'assert'

describe('random string', function() {
  it('should gen random string', function() {
    repeat(100, () => {
      const gen = string()
      assert(gen)
      assert('string' === typeof gen)
      assert(gen.length >= 4 && gen.length <= 16)
    })
  })

  it('should gen random string with min and max length', function() {
    repeat(100, () => {
      const gen = string({ min: 5 })
      assert(gen.length >= 5 && gen.length <= 16)
      const gen2 = string({ max: 10 })
      assert(gen2.length >= 4 && gen2.length <= 10)
      const gen3 = string({ min: 5, max: 10 })
      assert(gen3.length >= 5 && gen3.length <= 10)
      const gen4 = string({ min: 20 })
      assert(gen4.length === 20)
      const gen5 = string({ min: 3 })
      assert(gen5.length >= 3 && gen5.length <= 16)
      const gen6 = string({ min: 5, max: 5 })
      assert(gen6.length === 5)
    })
  })
})
