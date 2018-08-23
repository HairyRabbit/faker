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
    const { db = [], isDefault = false } = provider[locale] || {}

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

  return function createFaker1(options: Options<T> = {}): T {
    const {
      locale = defaultLocale,
      test,
      include,
      exclude,
      weight
    } = options

    const {
      pre = (a, _) => a,
      proc = (d, _) => oneof(d),
      post = (a, _) => a
    } = provider[locale] || {}

    const data1 = data[locale]
    const data2 = pre(data1, options)
    const data3 = (test || include || exclude)
          ? choose({ test, include, exclude })(data2)
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
