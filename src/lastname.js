/**
 * gen firstname
 *
 * @flow
 */

import { repeat, createFaker } from './'

export default createFaker({ name: 'lastname' })


/**
 * test
 */

import assert from 'assert'

describe('random lastname', function() {
  const faker = createFaker({ name: 'lastname' })

  it('should gen lastname', function() {
    repeat(100, () => {
      const gen = faker()
      assert(gen)
    })
  })

  it('should gen lastname with locale options', function() {
    repeat(100, () =>{
      const gen = faker({ locale: 'en' })
      assert(/[a-zA-Z]/.test(gen))
      const gen2 = faker({ locale: 'zh' })
      assert(!/[a-zA-Z]/.test(gen2))
    })
  })
})
