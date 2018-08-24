/**
 * random prefecture
 *
 * @flow
 */

import { repeat, oneof, createFaker } from './'

const fake = createFaker('prefecture', {
  zh: {
    db: 'require:division',
    setup(db) {
      const regex = /^(\d{2})(\d[1-9])00/
      const keys = Object.keys(db)

      const data = []
      const province = {}

      keys.forEach(key => {
        const ma = key.match(regex)
        if(!ma) {
          return
        }

        const upcode = key.substr(0, 2).padEnd(6, 0)
        const val = {
          code: key,
          value: db[key],
          up: {
            code: upcode,
            value: db[upcode]
          }
        }

        data.push(val)

        const [_, m1 ] = ma
        province[m1] = province[m1] || []
        province[m1].push(val)
      })

      return [data, province]
    },
    pre(data, { province }) {
      if(!province) {
        return data[0]
      }

      const code = province.substr(0, 2)
      return data[1][code]
    },
    proc(data, { full, format }) {
      const gen = oneof(data)

      if(!full) {
        return gen.value
      }

      return [gen.up.value, gen.value].join(format ? ' ': '')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random prefecture', function() {
  it('should gen random prefecture', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })

  it('should gen random prefecture with given province', function() {
    const data = require('../data/zh/division.json')
    const keys = Object.keys(data)
    repeat(1e3, () => {
      const gen = fake({ province: '11' })
      const val = keys.filter(key => /^11/.test(key)).map(key => data[key])
      assert(~val.indexOf(gen))
    })
  })

  it('should gen random prefecture with full options', function() {
    repeat(1e3, () => {
      const gen = fake({ province: '11', full: true })
      assert(gen.startsWith('北京市'))
    })
  })

  it('should gen random prefecture with full and format options', function() {
    repeat(1e3, () => {
      const gen = fake({ province: '11', full: true, format: true })
      assert(gen.startsWith('北京市 '))
    })
  })
})
