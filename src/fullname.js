/**
 * gen fullname
 *
 * @flow
 */

import { pick, oneof, repeat } from './'
import createFirstname, { type Options as FirstNameOptions } from './firstname'
import createLastname, { type Options as LastNameOptions } from './lastname'

export type Options = {
  firstname?: string,
  lastname?: string,
  ...FirstNameOptions,
  ...LastNameOptions
}

export default function fullname({ firstname, lastname, locale, sex, len }: Options = {}): string {
  const loc = locale || oneof(['en', 'zh'])

  const [first, last] =  [
    firstname || createFirstname({ locale: loc }),
    lastname || createLastname({ locale: loc, sex, len })
  ]

  /**
   * output without whitespace, e.g. '梁小兔'
   */
  if('zh' === loc) {
    return [last, first].join('')
  }

  return [first, last].join(' ')
}


/**
 * test
 */

import assert from 'assert'

describe('random fullname', function() {
  it('should gen random fullname', function() {
    repeat(100, () => {
      const gen = fullname()
      assert(gen)
    })
  })

  it('should gen random fullname with locale', function() {
    repeat(100, () => {
      const gen = fullname({ locale: 'en' })
      assert(/[a-zA-Z]/.test(gen))
      const gen2 = fullname({ locale: 'zh' })
      assert(!/[a-zA-Z]/.test(gen2))
    })
  })

  it('should gen random fullname with given firstname', function() {
    repeat(100, () => {
      const gen = fullname({ firstname: 'a' })
      assert(gen[0] === 'a' || gen[gen.length - 1] === 'a')
    })
  })

  it('should gen random fullname with given lastname', function() {
    repeat(100, () => {
      const gen = fullname({ lastname: 'a' })
      assert(gen[gen.length - 1] === 'a' || gen[0] === 'a')
    })
  })
})
