/**
 * boolean
 *
 * @flow
 */

import { repeat, createFaker } from './'

const db  = [ true, false ]
const faker = createFaker({ db })

export default faker


/**
 * test
 */

import assert from 'assert'

describe('random boolean', function() {
  it('should gen random boolean', function() {
    repeat(100, () => {
      const gen = faker()
      assert('boolean' === typeof gen)
      assert(~db.indexOf(gen))
    })
  })
})
