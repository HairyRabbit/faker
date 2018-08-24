/**
 * random province
 *
 * @flow
 */

import { repeat, createFaker } from './'

const fake = createFaker('province', {
  zh: {
    db: 'require:division',
    setup(db) {
      return Object.keys(db)
        .filter(key => /^\d{2}0000/.test(key))
        .map(key => db[key])
    }
  }
})

export default fake


/**
 * test
 */

import assert from 'assert'

describe('random province', function() {
  it('should gen random province', function() {
    const data = require('../data/zh/division.json')
    const val = Object.keys(data)
          .filter(key => /^\d{2}0000/.test(key))
          .map(key => data[key])

    repeat(1e3, () => {
      const gen = fake()
      assert(gen)
      assert(~val.indexOf(gen))
    })
  })
})
