/**
 * random string
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'
import letter from './letter'
import boolean from './boolean'

export const fake = createFaker('string', {
  default: {
    proc(_, { min, max, format, ...options }) {
      const len = minmax(4, 16, min, max)

      return repeat(len, () => letter({ upcase: boolean(), ...options })).join('')
    }
  }
})

export default fake


// function parse(input: string | RegExp): Array<(Context) => string> {
//   const T = {
//     ROOT: '',
//     GROUP: '()',
//     POSITION: '^|$',
//     SET: '[]',
//     RANGE: '{}',
//     REPETITION: '*|+|?|{min, max}',
//     REFERENCE: '\\1\\2',
//     CHAR: ''
//   }

//   const tokens = []
//   const curr = (input instanceof RegExp ? input.source : input).split('')

//   let stack = []

//   while(curr.length) {
//     run()
//   }

//   return tokens

//   function run() {
//     switch (true) {
//       case match('Y'):
//         if(match('Y')) {
//           if(match('Y')) {
//             if(match('Y')) {
//               make(T.YYYY, 4)
//               return
//             }
//             back()
//           }
//           make(T.YY, 2)
//           return
//         }
//         return
//       case match('M'):
//         if (match('M')) {
//           if (match('M')) {
//             if (match('M')) {
//               make(T.MMMM, 4)
//               return
//             }
//             make(T.MMM, 3)
//             return
//           }
//           make(T.MM, 2)
//           return
//         } else if (match('o')) {
//           make(T.Mo, 2)
//           return
//         }
//         make(T.M, 1)
//         return
//       case match('Q'):
//         if(match('Q')) {
//           make(T.QQ, 2)
//           return
//         } else if(match('o')) {
//           make(T.Qo, 2)
//           return
//         }
//         make(T.Q, 1)
//         return

//       case match('D'):
//         if(match('D')) {
//           if(match('D')) {
//             if(match('D')) {
//               make(T.DDDD, 4)
//               return
//             } else if(match('o')) {
//               make(T.DDDo, 4)
//               return
//             }
//             make(T.DDD, 3)
//             return
//           }
//           make(T.DD, 2)
//           return
//         } else if(match('o')) {
//           make(T.Do, 2)
//           return
//         }
//         make(T.D, 1)
//         return
//       case match('d'):
//         if(match('d')) {
//           if(match('d')) {
//             if(match('d')) {
//               make(T.dddd, 4)
//               return
//             }
//             make(T.ddd, 3)
//             return
//           }
//           make(T.dd, 2)
//           return
//         } else if(match('o')) {
//           make(T.do, 2)
//           return
//         }
//         make(T.d, 1)
//         return
//       case match('w'):
//         if(match('w')) {
//           make(T.ww, 2)
//           return
//         } else if(match('o')) {
//           make(T.wo, 2)
//           return
//         }
//         make(T.w, 1)
//         return
//       case match('A'):
//         make(T.A, 1)
//         return
//       case match('a'):
//         make(T.a, 1)
//         return
//       case match('H'):
//         if(match('H')) {
//           make(T.HH, 2)
//           return
//         }
//         make(T.H, 1)
//         return
//       case match('h'):
//         if(match('h')) {
//           make(T.hh, 2)
//           return
//         }
//         make(T.h, 1)
//         return
//       case match('m'):
//         if(match('m')) {
//           make(T.mm, 2)
//           return
//         }
//         make(T.m, 1)
//         return
//       case match('s'):
//         if(match('s')) {
//           make(T.ss, 2)
//           return
//         }
//         make(T.s, 1)
//         return
//       case match('S'):
//         if(match('S')) {
//           if(match('S')) {
//             make(T.SSS, 3)
//             return
//           }
//           make(T.SS, 2)
//           return
//         }
//         make(T.S, 1)
//         return
//       case match('X'):
//         make(T.X, 1)
//         return
//       case match('x'):
//         make(T.x, 1)
//         return
//       default:
//         next()
//         return
//     }
//   }

//   function back() {
//     curr.unshift(stack.pop())
//   }

//   function next() {
//     const fst = curr.shift()
//     if(!fst) {
//       return null
//     }
//     stack.push(fst)
//     return fst
//   }

//   function match(char) {
//     const nn = next()
//     if(nn) {
//       if (char === nn) {
//         return true
//       } else {
//         back()
//         return false
//       }
//     } else {
//       return false
//     }
//   }

//   function make(token, len) {
//     if(token) {
//       for(let i = 0; i < len; i++) {
//         stack.pop()
//       }
//     }
//     if(stack.length) {
//       const str = stack.join('')
//       tokens.push(ctx => str)
//     }
//     if(token) {
//       tokens.push(token)
//     }
//     stack = []
//   }
// }



/**
 * test
 */

import assert from 'assert'

describe('random string', function() {
  it('should gen random string', function() {
    repeat(100, () => {
      const gen = fake()
      assert(gen)
      assert('string' === typeof gen)
      assert(gen.length >= 4 && gen.length <= 16)
    })
  })

  it('should gen random string with min and max length', function() {
    repeat(100, () => {
      const gen = fake({ min: 5 })
      assert(gen.length >= 5 && gen.length <= 16)
      const gen2 = fake({ max: 10 })
      assert(gen2.length >= 4 && gen2.length <= 10)
      const gen3 = fake({ min: 5, max: 10 })
      assert(gen3.length >= 5 && gen3.length <= 10)
      const gen4 = fake({ min: 20 })
      assert(gen4.length === 20)
      const gen5 = fake({ min: 3 })
      assert(gen5.length >= 3 && gen5.length <= 16)
      const gen6 = fake({ min: 5, max: 5 })
      assert(gen6.length === 5)
    })
  })
})
