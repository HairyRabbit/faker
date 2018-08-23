/**
 * random with weight
 *
 * @flow
 */

import { random, choose } from '../'

export type Options<T> = [T, number]

export default function weight<T>(data: Array<T> = [], options: Options<T> = []): T | Array<T> {
  if(!data.length) {
    throw new Error(
      `No data found`
    )
  }

  if(options.length > data.length) {
    throw new Error(
      `The weight set length should less then data set`
    )
  }

  const sum = options.reduce((a, c) => a + c[1], 0)
  if(sum > 1) {
    throw new Error(
      `The weight sum should less then 1`
    )
  }

  const [ we ] = options.reduce(([acc, curr], [key, val]) => {
    const next = curr + val

    acc.push({
      key,
      val,
      left: curr,
      right: next
    })

    return [acc, next]
  }, [[], 0])

  const gen = random(0, 1, false)
  const ma = we.find(w => gen >= w.left && gen < w.right)

  /**
   * matched options, return key
   */
  if(ma) {
    const key = ma.key

    if(!Boolean(~data.indexOf(key))) {
      throw new Error(
        `The weight key ${key} not exists in data set.`
      )
    }

    return key
  }

  /**
   * not matched given key, goto next step
   */
  return choose({
    exclude: options.map(w => w[0])
  })(data)
}
