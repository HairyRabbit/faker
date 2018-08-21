/**
 * construct a list by range
 *
 * @flow
 */

export default function range(from: number, to: number): Array<number> {
  return Array(to - from + 1).fill(1).map((_, idx) => idx + from)
}
