/**
 * random date
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'

const fake = createFaker('date', {
  default: {
    proc(_, { min, max }) {
      const num = minmax(0, Date.now(), +min, +max)
      return new Date(num)
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random date', function() {
  it('should gen random date', function() {
    const gen = fake()
    assert(gen)
    assert(gen instanceof Date)
  })

  it('should gen random date gte min', function() {
    const date = new Date('2018')
    const gen = fake({ min: date })
    assert(+gen >= +date)
  })

  it('should gen random date lte min', function() {
    const date = new Date('2018')
    const gen = fake({ max: date })
    assert(+gen <= +date)
  })

  it('should gen random date between min and max', function() {
    const mindate = new Date('2018-01')
    const maxdate = new Date('2018-10')
    const gen = fake({ min: mindate, max: maxdate })
    assert(+gen <= +maxdate && +gen >= +mindate)
  })
})
