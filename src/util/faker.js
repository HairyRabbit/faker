/**
 * create faker
 *
 * @flow
 */

import { oneof, choose, random } from '../'

export type Options<T> = {
  locale?: Locale,
  weight?: Array<[T, number]>,
  ...ChooseOptions
}

export type CreateOptions<T, O> = {
  name: string,
  selector?: ((DB<T>, O) => (Array<T> | [Array<T>, (Array<T> => Array<T>)])),
  db?: DB<T>
}

export type DB<T> =
  | Array<T>
  | {
    [key: string]: DB
  }

export default function createFaker<T, O>({ name, db, selector = a => a }) {

  // const context = require.context('../data', true, /\.json$/)
  // const locales = context.keys().reduce((acc, curr) => {
  //   acc.push(curr.match(/^\.\/(\w+)\//)[1])
  //   return acc
  // }, [])

  const locales = ['en', 'zh']

  return function createFaker1(options: O = {}): T {
    const { locale, weight, test, include, exclude } = options

    let data = db

    if(!db) {
      if(locale) {
        if(Boolean(!~locales.indexOf(locale))) {
          throw new Error(
            `locale "${locale}" not supports, should one of ${locales.toString()}`
          )
        }
      }

      const loc = locale || oneof(locales)
      data = require(`../../data/${loc}/${name}.json`)
    } else {
      if(!Array.isArray(db)) {
        if(!locale) {
          const loc = locale || oneof(locales)
          if(db[loc]) {
            data = db[loc]
          }
        }
      }
    }

    /**
     * select sub set
     */
    const res = selector(data, options)

    let proc = oneof

    if(res.data) {
      data = res.data
      proc = res.proc
    } else {
      data = res
    }

    /**
     * apply choose, ensure more then one element in the dataset.
     */
    data = choose({ test, include, exclude })(data)

    if(0 === data.length) {
      throw new Error(
        `Dataset haven't any element, ${data.toString()}`
      )
    }


    if(weight) {
      if(weight.length > data.length) {
        throw new Error(
          `The weight set length should less then data set`
        )
      }

      const sum = weight.reduce((a, c) => a + c[1], 0)
      if(sum > 1) {
        throw new Error(
          `Sum weight should less then 1`
        )
      }

      const [ we ] = weight.reduce(([acc, curr], [key, val]) => {
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

      if(ma) {
        const key = ma.key

        if(Boolean(!~data.indexOf(key))) {
          throw new Error(
            `The weight key ${key} not exists in data set.`
          )
        }

        return ma.key
      }

      const keys = weight.map(w => w[0])
      data = choose({ exclude: keys })(data)
    }

    return proc(data)
  }
}
