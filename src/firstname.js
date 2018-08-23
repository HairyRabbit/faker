/**
 * gen lastname
 *
 * @flow
 */

import { pick, oneof, createFaker, type Options as FakerOptions } from './'

export type Options = {
  gender?: 1 | 2,
  length?: 1 | 2
} & FakerOptions<string>

function pre(data, { gender }: Options = {}) {
  const genderKey = `gender_${gender || oneof([1, 2])}`
  return data[genderKey]
}

const fake = createFaker('firstname', {
  en: {
    db: 'require',
    pre
  },
  zh: {
    db: 'require',
    pre,
    proc(data, { length }: Options = {}) {
      const num = length || oneof([1, 2])
      return pick(num, data).join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random firstname', function() {
  it('should gen firstname', function() {
    const gen = fake()
    assert(gen)
  })

  it('should gen firstname with locale options', function() {
    const gen = fake({ locale: 'en' })
    assert(/[a-zA-Z]/.test(gen))
    const gen2 = fake({ locale: 'zh' })
    assert(!/[a-zA-Z]/.test(gen2))
  })

  it('should gen firstname with sex options', function() {
    const gen = fake({ locale: 'en', gender: 2 })
    assert(~require('../data/en/firstname.json').gender_2.indexOf(gen))
  })

  it('should gen firstname with len options', function() {
    const gen = fake({ locale: 'zh', length: 2 })
    assert(gen.length === 2)
  })
})
