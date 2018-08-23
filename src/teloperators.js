/**
 * random telecommunication operators
 *
 * @flow
 */

import { repeat, createFaker } from './'

export const TELOPERATOR = {
  MOBILE: 'mobile',
  UNICOM: 'unicom',
  TELECOM: 'telecom'
}

const fake = createFaker('teloperators', {
  zh: {
    db: Object.values(TELOPERATOR).map(s => `china ${s}`)
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random telecommunication operators', function() {
  it('should gen random tel operators', function() {
    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert(~Object.values(TELOPERATOR).indexOf(gen.substr(6)))
    })
  })
})
