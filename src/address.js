/**
 * random address
 *
 * @flow
 */

import { repeat, createFaker, county as randomCounty, firstname } from './'

const fake = createFaker('address', {
  zh: {
    db: 'require:division',
    post(data, { province, prefecture, county, street, road, format }) {
      /**
       * address fotmat
       *
       *   xxx xx xx
       *    ^-------- [A] county
       *        ^---- [B] street
       *          ^-- [C] road
       */

      const a = county
            ? toDivisionString(data, county, format)
            : randomCounty({ province, prefecture, full: true, format })
      const b = street || (firstname({ locale: 'zh', length: 2 }) + '街')
      const c = road || (firstname({ locale: 'zh', length: 2 }) + '路')

      return [a, b, c].join(format ? ' ' : '')
    }
  }
})

function toDivisionString(data: { [key: string]: string }, cn: string, format: boolean): string {
  const pv = cn.substr(0, 2).padEnd(6, '0')
  const pf = cn.substr(0, 4).padEnd(6, '0')

  return [data[pv], data[pf], data[cn]].join(format ? ' ' : '')
}


export default fake


/**
 * test
 */

import assert from 'assert'

describe('random address', function() {
  it('should gen random address', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert(~gen.indexOf('街'))
      assert(~gen.indexOf('路'))
    })
  })

  it('should gen random address with format options', function() {
    repeat(1e3, () => {
      const gen = fake({ format: true })
      assert(~gen.indexOf(' '))
    })
  })

  it('should gen random address with given street', function() {
    repeat(1e3, () => {
      const gen = fake({ street: 'foo' })
      assert(~gen.indexOf('foo'))
    })
  })

  it('should gen random address with given road', function() {
    repeat(1e3, () => {
      const gen = fake({ road: 'foo' })
      assert(~gen.indexOf('foo'))
    })
  })
})
