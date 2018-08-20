/**
 * boolean
 *
 * @flow
 */

import { repeat, createFaker } from './'

export const db  = [ true, false ]

export default createFaker({ db })


/**
 * test
 */

import assert from 'assert'

describe('random boolean', function() {
  const faker = createFaker({ db })

  it('should gen random boolean', function() {
    repeat(100, () => {
      assert(~db.indexOf(faker()))
    })
  })
})
