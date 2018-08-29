/**
 * random how long ago
 *
 * @flow
 */

import { repeat, oneof, random, createFaker } from './'

export const fake = createFaker('howlong', {
  en: {
    db: 'require',
    proc(db, { number }) {
      const gen = oneof(db)

      switch(gen) {
        case 'second':
        case 'minute':
          return format(number || random(1, 59), gen)
        case 'hour':
          return format(number || random(1, 23), gen)
        case 'day':
          return format(number || random(1, 30), gen)
        case 'month':
          return format(number || random(1, 11), gen)
        case 'year':
          return format(number || random(1, 5), gen)
        default:
          return gen
      }

      function format(num: number, flag: string): string {
        return [
          num.toString(),
          flag + (1 === num ? '' : 's'),
          'ago'
        ].join(' ')
      }
    }
  },
  zh: {
    db: 'require',
    proc(db, { number }) {
      const gen = oneof(db)

      switch(gen) {
        case '秒':
        case '分钟':
          return format(number || random(1, 59), gen)
        case '小时':
          return format(number || random(1, 23), gen)
        case '天':
          return format(number || random(1, 30), gen)
        case '月':
          return format(number || random(1, 11), gen)
        case '年':
          return format(number || random(1, 5), gen)
        default:
          return gen
      }

      function format(num: number, flag: string): string {
        return [
          num.toString(),
          flag + '前'
        ].join(' ')
      }
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random howlong', function() {
  it('should gen random howlong', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(/(just now|\d{1,2} (second|minute|hour|day|month|year)s? ago)/.test(gen))
    })
  })

  it('should gen random howlong with locale options', function() {
    repeat(1e3, () => {
      const gen = fake({ locale: 'zh' })
      assert(/(刚刚|\d{1,2} (秒|分钟|小时|天|月|年)前)/.test(gen))
    })
  })

  it('should gen random howlong with number options', function() {
    repeat(1e3, () => {
      const gen = fake({ number: 10 })
      assert(/(just now|10 (second|minute|hour|day|month|year)s ago)/.test(gen))
    })
  })
})
