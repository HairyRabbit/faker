/**
 * same as pick, buy only pick one element
 *
 * @flow
 */

import { pick } from '../'

export default function oneof<T>(arr: Array<T>): T {
  return pick(1, arr)[0]
}
