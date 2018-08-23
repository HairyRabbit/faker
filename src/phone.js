/**
 * random phone numebr
 *
 * @link [ChinaMobile number section](https://shop.10086.cn/list/134_351_351_0_0_0_0.html)
 * @link [ChinaUnicom number section](http://num.10010.com/NumApp/chseNumList/init)
 * @link [ChiinaTelecom number section](https://www.189.cn/haoma/numList.html?v_headnumber=199)
 * @flow
 */

import { repeat, oneof, createFaker } from './'
import { teloperators, natural } from './'

const fake = createFaker('phone', {
  zh: {
    db: 'require',
    pre(data, { operator }) {
      const oper = `oper_${operator || teloperators().substr(6)}`
      return data[oper]
    },
    proc(data, { country, network, area, user, format }) {
      /**
       * phone numebr syntax:
       *
       *   (xx)xxx xxxx xxxx
       *     ^----------------- [A]country code
       *        ^-------------- [B]network ID
       *             ^--------- [C]area coding
       *                  ^---- [D]user random number
       */
      const a = country ? '+86' : ''
      const b = network || oneof(data)
      const c = area || make()
      const d = user || make()

      return [a, b, c, d].filter(Boolean).join(format ? ' ' : '')
    }
  }
})

function make(): string {
  return repeat(4, () => natural({ max: 9 })).map(String).join('')
}


export default fake


/**
 * test
 */

import assert from 'assert'

describe('random phone', function() {
  it('should gen random phone number', function() {
    const gen = fake()
    assert(gen)
    assert(11 === gen.length)
  })

  it('should gen random phone number with given operator', function() {
    const gen = fake({ operator: 'telecom' })
    assert(/^(189|181|180|153|133|177|173|199)/.test(gen))
  })

  it('should gen random phone number with given network', function() {
    const gen = fake({ network: 'foo' })
    assert(/^foo/.test(gen))
  })

  it('should gen random phone number with given area', function() {
    const gen = fake({ area: 'foo' })
    assert(/^\d{3}foo/.test(gen))
  })

  it('should gen random phone number with given user', function() {
    const gen = fake({ user: 'foo' })
    assert(/^\d{7}foo/.test(gen))
  })

  it('should gen random phone number when country was true', function() {
    const gen = fake({ country: true })
    assert(/^\+86/.test(gen))
  })

  it('should gen random phone number with format', function() {
    const gen = fake({ format: true })
    assert(/^\d{3} \d{4} \d{4}$/.test(gen))
  })

  it('should gen random phone number with country and format', function() {
    const gen = fake({ country: true, format: true })
    assert(/^\+86 \d{3} \d{4} \d{4}$/.test(gen))
  })
})
