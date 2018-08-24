/**
 * random email
 *
 * @link [email address wiki](https://en.wikipedia.org/wiki/Email_address)
 * @flow
 */

import { repeat, oneof, createFaker, word } from './'

const fake = createFaker('email', {
  en: {
    db: 'require',
    proc(db, { local, domain, ...options }) {
      /**
       * email format:
       *
       *   xx@domain.com
       *    ^------------- [A] local
       *        ^--------- [B] domain
       *
       */
      const a = local || word(options)
      const b = domain || oneof(db)
      return [a, b].join('@')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random email', function() {
  it('should gen random email', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert(/^[^@]+@[^]+$/.test(gen))
    })
  })

  it('should gen random email with given local', function() {
    repeat(1e3, () => {
      const gen = fake({ local: 'foo' })
      assert(gen)
      assert(/^foo@[^]+$/.test(gen))
    })
  })

  it('should gen random email with given domain', function() {
    repeat(1e3, () => {
      const gen = fake({ domain: 'github.com' })
      assert(gen)
      assert(/^[^@]+@github.com$/.test(gen))
    })
  })
})
