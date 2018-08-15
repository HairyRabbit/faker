/**
 * random character
 *
 * @flow
 */

import { repeat, pick, oneof } from './'

export const db = 'abcdefghijklmnopqrstuvwxyz'

export type Options = {
  casing?: 'upper' | 'lower'
}

export default function char({ casing }: Options = {}): string {
  const cas = casing || oneof(['upper', 'lower'])
  const gen = oneof(db)

  if('upper' === cas) {
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
      assert(/[a-zA-Z]/.test(char()))
    })
  })

  it('should gen random char and uppercase', function() {
    repeat(100, () => {
      assert(/[A-Z]/.test(char({ casing: 'upper' })))
    })
  })
})
