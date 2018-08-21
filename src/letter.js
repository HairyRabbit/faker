/**
 * random letter
 *
 * @flow
 */

import { repeat, type Options as FakerOptions } from './'
import boolean from './boolean'
import char from './char'

export type Options = {
  upcase: boolean
} & FakerOptions<string>

export default function letter({ upcase, ...options }: Options = {}) {
  const cas = 'boolean' === typeof upcase ? upcase : boolean()
  const gen = char(options)

  if(!cas) {
    return gen
  }

  return gen.toUpperCase()
}


/**
 * test
 */

import assert from 'assert'

describe('random letter', function() {
  it('should gen random letter', function() {
    repeat(100, () => {
      assert(/[a-zA-Z]+/.test(letter()))
    })
  })

  it('should gen random letter and uppercased', function() {
    repeat(100, () => {
      assert(/[A-Z]+/.test(letter({ upcase: true })))
    })
  })
})
