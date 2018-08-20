/**
 * random regexp
 *
 * @flow
 */

import { repeat, oneof } from './'

export const db = [/^[^]*$/, /^(?!)$/]

export type Options = {
  pass: boolean
}

export default function regexp({ pass }: Options = {}) {
  if('boolean' === typeof pass) {
    return pass ? db[0] : db[1]
  }

  return oneof(db)
}


/**
 * test
 */

import assert from 'assert'

describe('random regexp', function() {
  it('should gen random regexp', function() {
    repeat(100, () => {
      const gen = regexp()
      assert(gen)
      assert('[object RegExp]' === ({}).toString.call(gen))
    })
  })

  it('should gen random regexp, always pass or not', function() {
    repeat(100, () => {
      const gen = regexp({ pass: true })
      assert(gen.test(require('./').string()))
      const gen2 = regexp({ pass: false })
      assert(!gen2.test(require('./').string()))
    })
  })
})
