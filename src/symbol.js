/**
 * random character
 *
 * @flow
 */

import { repeat, pick, oneof } from './'

export const db = '!@#$%^&*._+~,?'

export default function symbol(): string {
  return oneof(db)
}


/**
 * test
 */

import assert from 'assert'

describe('random symbol', function() {
  it('should gen random symbol', function() {
    repeat(100, () => {
      assert(Boolean(~db.indexOf(symbol())))
    })
  })
})
