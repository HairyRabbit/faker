/**
 * random regexp
 *
 * @flow
 */

import { repeat, oneof, createFaker } from './'

const db = [/^[^]*$/, /^(?!)$/]

const fake = createFaker('regexp', {
  default: {
    db,
    proc(db, { pass }) {
      return 'boolean' === typeof pass
        ? (pass ? db[0] : db[1])
        : oneof(db)
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random regexp', function() {
  it('should gen random regexp', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert('[object RegExp]' === ({}).toString.call(gen))
    })
  })

  it('should gen random regexp, always pass or not', function() {
    repeat(1e3, () => {
      const gen = fake({ pass: true })
      assert(gen.test(require('./').string()))
    })
  })

  it('should gen random regexp, always failed', function() {
    repeat(1e3, () => {
      const gen = fake({ pass: false })
      assert(!gen.test(require('./').string()))
    })
  })
})
