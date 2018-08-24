/**
 * random password
 *
 * @flow
 */

import { repeat, pick, minmax, createFaker } from './'
import { db as charDb } from './char'
import { db as symbolDb } from './symbol'

const fake = createFaker('password', {
  default: {
    db: [].concat(charDb, symbolDb),
    proc(db, { min, max }) {
      const len = minmax(6, 20, min, max)
      return pick(len, db).join('')
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
    })
  })
})
