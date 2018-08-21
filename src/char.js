/**
 * random character
 *
 * @flow
 */

import { repeat, oneof, createFaker } from './'

export const db = 'abcdefghijklmnopqrstuvwxyz'.split('')

const faker = createFaker({ db })

export default faker


/**
 * test
 */

import assert from 'assert'

describe('random char', function() {
  it('should gen random char', function() {
    repeat(100, () => {
      const gen = faker()
      assert('string' === typeof gen)
      assert(1 === gen.length)
      assert(/[a-zA-Z]+/.test(gen))
    })
  })
})
