/**
 * boolean
 *
 * @flow
 */

import { oneof, repeat } from './'

export const db  = [ true, false ]

export default function boolean() {
  return oneof(db)
}


/**
 * test
 */

import assert from 'assert'

describe('random boolean', function() {
  it('should gen random boolean', function() {
    repeat(100, () => {
      assert(~db.indexOf(boolean()))
    })
  })
})
