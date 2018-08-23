/**
 * random character
 *
 * @flow
 */

import { repeat, pick, oneof, createFaker, type Options as FakerOptions } from './'

export const db = '!@#$%^&*._+~,?'.split('')

const fake = createFaker('symbol', {
  default: { db }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random symbol', function() {
  it('should gen random symbol', function() {
    repeat(100, () => {
      const gen = fake()
      assert(Boolean(~db.indexOf(gen)))
    })
  })
})
