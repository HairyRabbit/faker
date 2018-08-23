/**
 * gen firstname
 *
 * @flow
 */

import { repeat, createFaker } from './'

const fake = createFaker('lastname', {
  en: {
    db: 'require'
  },
  zh: {
    db: 'require'
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random lastname', function() {
  it('should gen lastname', function() {
    repeat(100, () => {
      const gen = fake()
      assert(gen)
    })
  })

  it('should gen lastname with locale options', function() {
    repeat(100, () =>{
      const gen = fake({ locale: 'en' })
      assert(/[a-zA-Z]/.test(gen))
      const gen2 = fake({ locale: 'zh' })
      assert(!/[a-zA-Z]/.test(gen2))
    })
  })
})
