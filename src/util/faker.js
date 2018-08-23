/**
 * create faker
 *
 * @flow
 */

import { oneof, choose, random, weight as disposeWeight, type ChooseOptions, type WeightOptions } from '../'

export type Options<T, D> = {
  locale?: string,
  weight?: WeightOptions<T, D>
} & ChooseOptions<T>

type SelectorHandler<T> = {
  data: Array<T>,
  proc?: Array<T> => T
}

type Selector<T, O> = (db: DB<T>, options?: O) => (Array<T> | SelectorHandler<T>)

export type CreateOptions<T, O> = {
  name?: string,
  db?: DB<T>,
  selector?: Selector<T, O>
}

export type DB<T> = Array<T> | { [key: string]: Array<T> }

type Provider<T, O> = {
  db: string | Array<T>,
  proc?: Array<T> => T
}

// createFaker({
//   default: {
//     db: [1,2,3],
//     proc: data => oneof(data)
//   }
// })

// export default function createFaker({ name, db, selector = a => a, ...config }: any = {}) {

//   let locales
//   if('production' === process.env.NODE_ENV) {
//     const context = require.context('../../data', true, /\.json$/)
//     locales = context.keys().reduce((acc, curr) => {
//       acc.push(curr.match(/^\.\/(\w+)\//)[1])
//       return acc
//     }, [])
//   } else {
//     locales = ['en', 'zh']
//   }

//   let cache = {}

//   return function createFaker1(options?: any = {}): any {
//     const { locale, weight, test, include, exclude } = options

//     if(locale && config[locale] && 'function' === typeof config[locale]) {
//       return config[locale](options)
//     }

//     if(!cache[locale]) {
//       let data = db

//       if(!db) {
//         if(locale) {
//           if(Boolean(!~locales.indexOf(locale))) {
//             throw new Error(
//               `locale "${locale}" not supports, should one of ${locales.toString()}`
//             )
//           }
//         }

//         if(!name) {
//           throw new Error(
//             `The name not provide`
//           )
//         }

//         const loc = locale || oneof(locales)
//         data = require(`../../data/${loc}/${name}.json`)
//       } else {
//         if(!Array.isArray(db)) {
//           if(!locale) {
//             const loc = locale || oneof(locales)
//             if(db[loc]) {
//               data = db[loc]
//             }
//           }
//         }
//       }

//       /**
//        * select sub set
//        */
//       if(!data) {
//         throw new Error(
//           `No data found`
//         )
//       }

//       cache[locale || 'default'] = data
//     }

//     let data = cache[locale || 'default']

//     const res = selector(data, options)
//     const { data: _data, proc } = Array.isArray(res)
//           ? { data: res, proc: oneof }
//           : res

//     /**
//      * apply choose, ensure more then one element in the dataset.
//      */
//     data = choose({ test, include, exclude })(_data)

//     if(0 === data.length) {
//       throw new Error(
//         `Dataset haven't any element, ${data.toString()}`
//       )
//     }


//     if(weight) {
//       if(weight.length > data.length) {
//         throw new Error(
//           `The weight set length should less then data set`
//         )
//       }

//       const sum = weight.reduce((a, c) => a + c[1], 0)
//       if(sum > 1) {
//         throw new Error(
//           `Sum weight should less then 1`
//         )
//       }

//       const [ we ] = weight.reduce(([acc, curr], [key, val]) => {
//         const next = curr + val

//         acc.push({
//           key,
//           val,
//           left: curr,
//           right: next
//         })

//         return [acc, next]
//       }, [[], 0])

//       const gen = random(0, 1, false)
//       const ma = we.find(w => gen >= w.left && gen < w.right)

//       if(ma) {
//         const key = ma.key

//         if(Boolean(!~data.indexOf(key))) {
//           throw new Error(
//             `The weight key ${key} not exists in data set.`
//           )
//         }

//         return ma.key
//       }

//       const keys = weight.map(w => w[0])
//       data = choose({ exclude: keys })(data)
//     }

//     return proc(data)
//   }
// }



export default function createFaker(name: string, provider: Provider = {}) {
  const keys = Object.keys(provider)
  if(!keys.length) {
    throw new Error(
      `can't find any provider at "${name}"`
    )
  }

  const data = {}
  let defaultLocale

  keys.forEach(locale => {
    const { db = [], isDefault } = provider[locale]

    data[locale] = 'require' === db
      ? require(`../../data/${locale}/${name}.json`)
      : db

    if(isDefault) {
      defaultLocale = locale
    }
  })

  if(!defaultLocale) {
    defaultLocale = keys[0]
  }

  return function createFaker1(options = {}) {
    const { locale = defaultLocale, test, include, exclude, weight } = options
    const { pre = a => a, proc = oneof, post = a => a } = provider[locale] || {}
    const data1 = data[locale]
    const data2 = pre(data1, options)
    const data3 = (test || include || exclude)
          ? choose({ test, include, exclude })(data2[locale])
          : data2

    let data4 = weight && Array.isArray(weight) && weight.length > 0
        ? disposeWeight(data3, weight)
        : data3

    if(!Array.isArray(data4)) {
      return post(data4, options)
    }

    return post(proc(data4, options), options)
  }
}
