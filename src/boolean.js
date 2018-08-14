/**
 * boolean
 *
 * @flow
 */

import { pickOne } from './'

export const db = [ true, false ]

export default function boolean(): boolean {
  return pickOne(db)
}


/**
 * test
 */

import assert from 'assert'

describe('random boolean', function() {
  it('should gen random boolean', function() {
    assert(~db.indexOf(boolean()))
  })
})
