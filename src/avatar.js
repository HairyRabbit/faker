/**
 * random avatar
 *
 * @flow
 */

import { repeat, oneof, pick } from './'

export const db = repeat(110 + 1, i => i)
export const prefix = 'https://raw.githubusercontent.com/HairyRabbit/faker/master/assets/avatar/'

export default function avatar(): string {
  return prefix + oneof(db) + '.jpg'
}


/**
 * test
 */

import assert from 'assert'

describe('random avatar', function() {
  it('should gen random avatar', function() {
    repeat(100, () => {
      const gen = avatar()
      assert(new RegExp(prefix + '\\\d{1,3}\\\.jpg').test(gen))
    })
  })
})
