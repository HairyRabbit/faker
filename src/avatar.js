/**
 * random avatar
 *
 * @flow
 */

import { repeat, random, createFaker } from './'

export const prefix = 'https://raw.githubusercontent.com/HairyRabbit/faker/master/assets/avatar/'

const fake = createFaker('avatar', {
  default: {
    proc(db) {
      return prefix + random(0, 110) + '.jpg'
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random avatar', function() {
  it('should gen random avatar', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(new RegExp(prefix + '\\\d{1,3}\\\.jpg').test(gen))
    })
  })
})
