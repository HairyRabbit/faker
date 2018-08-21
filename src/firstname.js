/**
 * gen lastname
 *
 * @flow
 */

import { pick, oneof, repeat, createFaker, type Options as FakerOptions } from './'

export type Options = {
  gender?: 1 | 2,
  length?: 1 | 2
} & FakerOptions<string>

function selector(db, { locale, gender, length }: Options = {}) {
  const num = locale === 'zh' ? (length || oneof([1, 2])) : 1
  const key = `gender_${gender || oneof([1, 2])}`

  return {
    data: db[key],
    proc: db => pick(num, db).join('')
  }
}

const faker = createFaker({ name: 'firstname', selector })

export default faker


/**
 * test
 */

import assert from 'assert'

describe('random firstname', function() {
  it('should gen firstname', function() {
    const gen = faker()
    assert(gen)
  })

  it('should gen firstname with locale options', function() {
    const gen = faker({ locale: 'en' })
    assert(/[a-zA-Z]/.test(gen))
    const gen2 = faker({ locale: 'zh' })
    assert(!/[a-zA-Z]/.test(gen2))
  })

  it('should gen firstname with sex options', function() {
    const gen = faker({ locale: 'en', gender: 2 })
    assert(~require('../data/en/firstname.json').gender_2.indexOf(gen))
  })

  it('should gen firstname with len options', function() {
    const gen = faker({ locale: 'zh', length: 2 })
    assert(gen.length === 2)
  })
})
