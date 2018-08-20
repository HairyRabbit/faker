/**
 * random character
 *
 * @flow
 */

import { repeat, pick, oneof, createFaker, typeof Options as FakerOptions } from './'

export const db = '!@#$%^&*._+~,?'.split('')

const faker = createFaker({ db })

export default faker


/**
 * test
 */

import assert from 'assert'

describe('random symbol', function() {
  it('should gen random symbol', function() {
    repeat(100, () => {
      const gen = faker()
      assert(Boolean(~db.indexOf(gen)))
    })
  })
})
