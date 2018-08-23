/**
 * random letter
 *
 * @flow
 */

import { repeat, createFaker } from './'
import boolean from './boolean'
import char from './char'

const fake = createFaker('letter', {
  default: {
    proc(_, { upcase, ...options }) {
      const gen = char(options)

      const cas = 'boolean' === typeof upcase ? upcase : boolean()

      if(!cas) {
        return gen
      }

      return gen.toUpperCase()
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random letter', function() {
  it('should gen random letter', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(/[a-zA-Z]+/.test(gen))
    })
  })

  it('should gen random letter and uppercased', function() {
    repeat(1e3, () => {
      const gen = fake({ upcase: true })
      assert(/[A-Z]+/.test(gen))
    })
  })
})
