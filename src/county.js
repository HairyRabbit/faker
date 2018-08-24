/**
 * random county
 *
 * @flow
 */

import { repeat, oneof, createFaker } from './'

const fake = createFaker('county', {
  zh: {
    db: 'require:division',
    setup(db) {
      const regex = /^(\d{2})(\d[1-9])(\d[1-9])/
      const keys = Object.keys(db)

      const data = []
      const province = {}
      const prefecture = {}

      keys.forEach(key => {
        const ma = key.match(regex)
        if(!ma) {
          return
        }

        const up1code = key.substr(0, 4).padEnd(6, 0)
        const up2code = key.substr(0, 2).padEnd(6, 0)
        const val = {
          code: key,
          value: db[key],
          up1: {
            code: up1code,
            value: db[up1code]
          },
          up2: {
            code: up2code,
            value: db[up2code]
          }
        }
        data.push(val)

        const [_, m1, m2 ] = ma
        province[m1] = province[m1] || []
        province[m1].push(val)
        prefecture[m1 + m2] = prefecture[m1 + m2] || []
        prefecture[m1 + m2].push(val)
      })

      return [data, province, prefecture]
    },
    pre(data, { province, prefecture }) {
      if(prefecture) {
        const code = prefecture.substr(0, 4)
        return data[2][code]
      } else if(province) {
        const code = province.substr(0, 2)
        return data[1][code]
      } else {
        return data[0]
      }
    },
    proc(data, { full, format }) {
      const gen = oneof(data)

      if(!full) {
        return gen.value
      }

      return [
        gen.up2.value,
        gen.up1.value,
        gen.value
      ].join(format ? ' ': '')
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random county', function() {
  it('should gen random county', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
    })
  })

  it('should gen random county with given prefecture', function() {
    const data = require('../data/zh/division.json')
    const keys = Object.keys(data)
    repeat(1e3, () => {
      const gen = fake({ prefecture: '1101' })
      const val = keys.filter(key => /^1101/.test(key)).map(key => data[key])
      assert(~val.indexOf(gen))
    })
  })

  it('should gen random county with given province', function() {
    const data = require('../data/zh/division.json')
    const keys = Object.keys(data)
    repeat(1e3, () => {
      const gen = fake({ province: '11' })
      const val = keys.filter(key => /^11/.test(key)).map(key => data[key])
      assert(~val.indexOf(gen))
    })
  })

  it('should gen random county with given prefecture and ignore province', function() {
    const data = require('../data/zh/division.json')
    const keys = Object.keys(data)
    repeat(1e3, () => {
      const gen = fake({ prefecture: '1101', province: '14' })
      const val = keys.filter(key => /^1101/.test(key)).map(key => data[key])
      assert(~val.indexOf(gen))
    })
  })

  it('should gen random county with full options', function() {
    repeat(1e3, () => {
      const gen = fake({ prefecture: '1101', full: true })
      assert(gen.startsWith('北京市市辖区'))
    })
  })

  it('should gen random county with full and format options', function() {
    repeat(1e3, () => {
      const gen = fake({ prefecture: '1101', full: true, format: true })
      assert(gen.startsWith('北京市 市辖区 '))
    })
  })
})
