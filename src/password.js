/**
 * random password
 *
 * @flow
 */

import { repeat, oneof, minmax, createFaker } from './'
import { db as charDb } from './char'
import { db as symbolDb } from './symbol'

export const passwordMinLength = 6
export const passwordMaxLength = 20

export const fake = createFaker('password', {
  default: {
    db: [].concat(charDb, symbolDb),
    proc(db, { min, max }) {
      const len = minmax(
        passwordMinLength,
        passwordMaxLength,
        min,
        max
      )

      return repeat(len, () => oneof(db)).join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random password', function() {
  it('should gen random password', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert(gen.length >= 4 && gen.length <= 20)
    })
  })

  it('should gen random password between min and max length', function() {
    repeat(1e3, () => {
      const gen = fake({ min: 10, max: 30 })
      assert(gen.length >= 10 && gen.length <= 30)
      const gen2 = fake({ min: 128 })
      assert(gen2.length === 128)
    })
  })
})
