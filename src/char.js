/**
 * random character
 *
 * @flow
 */

import { repeat, oneof, createFaker, type Options as FakerOptions } from './'
import boolean from './boolean'

export const db = 'abcdefghijklmnopqrstuvwxyz'.split('')

export type Options = {
  upcase?: boolean,
  ...FakerOptions
}

function selector({ upcase }: Options = {}): string {
  const cas = 'boolean' === typeof upcase ? upcase : boolean()
  const gen = oneof(db)

  if(cas) {
    return gen.toUpperCase()
  }

  return gen
}

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
