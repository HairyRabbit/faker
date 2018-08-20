/**
 * random character
 *
 * @flow
 */

import { repeat, pick, oneof } from './'
import boolean from './boolean'

export const db = 'abcdefghijklmnopqrstuvwxyz'

export type Options = {
  upcase?: boolean
}

export default function char({ upcase }: Options = {}): string {
  const cas = 'boolean' === typeof upcase ? upcase : boolean()
  const gen = oneof(db)

  if(cas) {
    return gen.toUpperCase()
  }

  return gen
}


/**
 * test
 */

import assert from 'assert'

describe('random char', function() {
  it('should gen random char', function() {
    repeat(100, () => {
      assert(/[a-zA-Z]+/.test(char()))
    })
  })

  it('should gen random char and uppercase', function() {
    repeat(100, () => {
      assert(/[A-Z]+/.test(char({ upcase: true })))
    })
  })
})
