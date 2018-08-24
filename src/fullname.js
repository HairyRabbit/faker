/**
 * gen fullname
 *
 * @flow
 */

import { pick, oneof, repeat, createFaker, firstname as randomFirstName, lastname as randomLastName  } from './'

const fake = createFaker('fullname', {
  en: {
    proc(_, { firstname, lastname, ...options }) {
      return [
        firstname || randomFirstName(options),
        lastname || randomLastName(options)
      ].join(' ')
    }
  },
  zh: {
    proc(_, { firstname, lastname, ...options }) {
      return [
        firstname || randomFirstName(options),
        lastname || randomLastName(options)
      ].join('')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random fullname', function() {
  it('should gen random fullname', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })

  it('should gen random fullname with locale', function() {
    repeat(1e3, () => {
      const gen = fake({ locale: 'en' })
      assert(/[a-zA-Z]/.test(gen))
      const gen2 = fake({ locale: 'zh' })
      assert(!/[a-zA-Z]/.test(gen2))
    })
  })

  it('should gen random fullname with given firstname', function() {
    repeat(1e3, () => {
      const gen = fake({ firstname: 'a' })
      assert(gen[0] === 'a' || gen[gen.length - 1] === 'a')
    })
  })

  it('should gen random fullname with given lastname', function() {
    repeat(1e3, () => {
      const gen = fake({ lastname: 'a' })
      assert(gen[gen.length - 1] === 'a' || gen[0] === 'a')
    })
  })
})
