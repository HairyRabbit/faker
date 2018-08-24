/**
 * create faker
 *
 * @flow
 */

import { oneof, choose, weight as disposeWeight, type ChooseOptions, type WeightOptions } from '../'

export type Options<T> = {
  locale?: string,
  weight?: WeightOptions<T>
} & ChooseOptions<T>

type DB<T> = Array<T> | { [string]: Array<T> }

type Provider<T> = {
  [locale: string]: {
    db?: string | DB<T>,
    isDefault?: boolean,
    pre?: (data: { [string]: Array<T> }, options: *) => Array<T>,
    proc?: (data: Array<T>, options: *) => T,
    post?: (data: T, options: *) => T,
  }
}

export default function createFaker<T>(name: string, provider: Provider<T> = {}): * {
  const keys = Object.keys(provider)
  if(!keys.length) {
    throw new Error(
      `can't find any provider at "${name}"`
    )
  }

  const data = {}
  let defaultLocale: string = ''

  keys.forEach(locale => {
    const { db = [], isDefault = false, setup = a => a } = provider[locale] || {}

    const dataset = /^require/.test(db) ? requireDB(db, locale) : db
    data[locale] = setup(dataset)

    if(isDefault) {
      defaultLocale = locale
    }
  })

  if(!defaultLocale) {
    defaultLocale = keys[0]
  }

  function requireDB<T>(str: string, locale: string): DB<T> {
    const regex = /^require(?::([^]+))?/
    const ma = str.match(regex)
    return require(`../../data/${locale}/${ma[1] || name}.json`)
  }

  return function createFaker1(options: Options<T> = {}): T {
    const {
      locale = defaultLocale,
      test,
      include,
      exclude,
      weight
    } = options

    const loc = data[locale] ? locale : defaultLocale

    const {
      pre = (a, _) => a,
      proc = (d, _) => oneof(d),
      post = (a, _) => a
    } = provider[loc] || {}

    const data1 = data[loc]
    const data2 = pre(data1, options)
    const data3 = (test || include || exclude)
          ? choose({ test, include, exclude })(data2)
          : data2
    const data4 = (weight && Array.isArray(weight) && weight.length > 0)
          ? disposeWeight(data3, weight)
          : data3

    if(!Array.isArray(data4)) {
      return post(data4, options)
    }

    return post(proc(data4, options), options)
  }
}
