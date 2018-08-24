/**
 * random date
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'

const fake = createFaker('date', {
  default: {
    pre(data, { min, max, format }) {
      if(isDate(min)) {
        throw new Error(
          `The min options should be JS Date Object, but got ${min}`
        )
      }

      if(isDate(max)) {
        throw new Error(
          `The min options should be JS Date Object, but got ${max}`
        )
      }

      return data
    },
    proc(_, { min, max, format }) {
      /**
       * date format, follow moment.js
       *
       * +-------+-----------------+
       * | Token | Output          |
       * +-------+-----------------+
       * | M     | 1 2             |
       * | Mo    | 1st 2nd         |
       * | MM    | 01 02           |
       * | MMM   | Jan Feb         |
       * | MMMM  | January Febrary |
       * |-------+-----------------|
       * | Q     | 1 2             |
       * | Qo    | 1st 2nd         |
       * |-------+-----------------|
       * | D     | 1 2             |
       * | Do    | 1st 2nd         |
       * | DD    | 01 02           |
       * | DDDo  | 1st 2nd         |
       * | DDDD  | 001 002         |
       * |-------+-----------------|
       */
      const gen = minmax(0, Date.now(), +min, +max)
      return new Date(gen)
    }
  }
})

function isDate(input): boolean %checks {
  return input instanceof Date
}


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
