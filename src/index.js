/**
 * faker
 *
 * @flow
 */

/**
 * core
 */
export { default as repeat } from './util/repeat'
export { default as random } from './util/random'
export { default as pick } from './util/pick'
export { default as oneof } from './util/oneof'
export { default as range } from './util/range'
export { default as minmax } from './util/minmax'
export { default as choose } from './util/choose'
export { default as weight } from './util/weight'
export { default as createFaker } from './util/faker'
export type { Options as ChooseOptions } from './util/choose'
export type { Options as WeightOptions } from './util/weight'
export type { Options as Options } from './util/faker'

/**
 * boolean
 */
export { default as boolean } from './boolean'

/**
 * number
 */
export { default as number } from './number'
export { default as float } from './float'
export { default as integer } from './integer'
export { default as natural } from './natural'

/**
 * string
 */
export { default as char } from './char'
export { default as string } from './string'
export { default as letter } from './letter'
export { default as symbol } from './symbol'

/**
 * regexp
 */
export { default as regexp } from './regexp'

/**
 * date
 */
export { default as date } from './date'
export { default as ago } from './ago'

/**
 * text
 */
export { default as word } from './word'
export { default as sentence } from './sentence'
export { default as title } from './title'
export { default as paragraph } from './paragraph'
export { default as password } from './password'

/**
 * person
 */
export { default as firstname } from './firstname'
export { default as lastname } from './lastname'
export { default as fullname } from './fullname'
export { default as avatar } from './avatar'

/**
 * telphone
 */
export { default as teloperators } from './teloperators'
export { default as phone } from './phone'

/**
 * location
 */
export { default as province } from './province'
export { default as prefecture } from './prefecture'
export { default as county } from './county'
export { default as address } from './address'

/**
 * web
 */
export { default as email } from './email'
