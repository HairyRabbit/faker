/**
 * random character
 *
 * @flow
 */

import { repeat, oneof, createFaker } from './'

export const db = 'abcdefghijklmnopqrstuvwxyz'.split('')

const fake = createFaker('char', {
  default: { db }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random char', function() {
  it('should gen random char', function() {
    repeat(100, () => {
      const gen = fake()
      assert('string' === typeof gen)
      assert(1 === gen.length)
      assert(/[a-zA-Z]+/.test(gen))
    })
  })
})
