/**
 * boolean
 *
 * @flow
 */

import { repeat, createFaker } from './'

const db  = [ true, false ]

const fake = createFaker('boolean', {
  default: { db }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random boolean', function() {
  it('should gen random boolean', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert('boolean' === typeof gen)
      assert(~db.indexOf(gen))
    })
  })
})
