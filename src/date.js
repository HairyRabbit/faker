/**
 * random date
 *
 * @flow
 */

import { repeat, minmax, createFaker } from './'

const fake = createFaker('date', {
  default: {
    pre(data, { min, max, format }) {
      if(min && !isDate(min)) {
        throw new Error(
          `The min options was invalid Date "${min}"`
        )
      }

      if(max && !isDate(max)) {
        throw new Error(
          `The max options was invalid Date "${max}"`
        )
      }

      return data
    },
    proc(_, { min, max, format }) {
      /**
       * date format, same as moment, but not full supports
       *
       * +-------+-----------------+-------+-----------------+
       * | Token | Output          | Token | Output          |
       * +-------+-----------------+-------+-----------------+
       * | YY    | 70 70 .. 30     | A     | AM PM           |
       * | YYYY  | 1970 ... 2030   | a     | am pm           |
       * +-------+-----------------+-------+-----------------+
       * | M     | 1 2             | H     | 0 1 .. 23       |
       * | Mo    | 1st 2nd         | HH    | 00 01 .. 23     |
       * | MM    | 01 02           | h     | 1 2 .. 12       |
       * | MMM   | Jan Feb         | hh    | 01 02 .. 12     |
       * | MMMM  | January Febrary +-------+-----------------+
       * +-------+-----------------+ m     | 0 1 .. 59       |
       * | Q     | 1 2             | mm    | 00 01 .. 59     |
       * | Qo    | 1st 2nd         +-------+-----------------+
       * | QQ    | 01 02           | s     | 0 1 .. 59       |
       * +-------+-----------------+ ss    | 00 01 .. 59     |
       * | D     | 1 2             +-------+-----------------+
       * | Do    | 1st 2nd         | S     | 0 1 .. 9        |
       * | DD    | 01 02           | SS    | 00 01 .. 99     |
       * | DDDo  | 1st 2nd         | SSS   | 000 001 ... 999 |
       * | DDDD  | 001 002         +-------+-----------------+
       * +-------+-----------------+ X     | 1360013296      |
       * | d     | 0 1 .. 6        | x     | 1360013296000   |
       * | do    | 0th 1st         +-------+-----------------+
       * | dd    | Su Mo           |
       * | ddd   | Sun Mon         |
       * | dddd  | Sunday Monday   |
       * +-------+-----------------+
       * | w     | 1 2 .. 53       |
       * | wo    | 1st             |
       * | ww    | 01 02 .. 53     |
       * +-------+-----------------+
       * | W     | 1 2 .. 53       |
       * | Wo    | 1st 2nd         |
       * | WW    | 01 02 .. 53     |
       * +-------+-----------------+
       */
      const gen = minmax(0, Date.now(), +min, +max)
      const date = new Date(gen)

      if(!format) {
        return date
      }

      return datefmt(format)(date)
    }
  }
})

function isDate(input): boolean %checks {
  return !isNaN(new Date(input))
}

function datefmt(tpl: string): * {
  const T = {
    YYYY: ({ year }) => year.toString(),
    YY: ({ year }) => year.toString().substr(2),
    MMMM: ({ month }) => toMonth(month),
    MMM: ({ month }) => toMonth(month).substr(0, 3),
    MM: ({ month }) => month.toString().padStart(2, '0'),
    Mo: ({ month }) => toNumeral(month),
    M: ({ month }) => month.toString(),
    QQ: ({ quarter }) => quarter.toString().padStart(2, '0'),
    Qo: ({ quarter }) => toNumeral(quarter.toString()),
    Q: ({ quarter }) => quarter.toString(),
    DDDD: ({ dayofyear }) => dayofyear.toString().padStart(3, '0'),
    DDDo: ({ dayofyear }) => toNumeral(dayofyear),
    DDD: ({ dayofyear }) => dayofyear.toString(),
    DD: ({ day }) => day.toString().padStart(2, '0'),
    Do: ({ day }) => toNumeral(day),
    D: ({ day }) => day.toString(),
    dddd: ({ week }) => toWeekDay(week),
    ddd: ({ week }) => toWeekDay(week).substr(0, 3),
    dd: ({ week }) => toWeekDay(week).substr(0, 2),
    do: ({ week }) => toNumeral(week),
    d: ({ week }) => week.toString(),
    ww: ({ weekofyear }) => weekofyear.toString().padStart(2, '0'),
    wo: ({ weekofyear }) => toNumeral(weekofyear),
    w: ({ weekofyear }) => weekofyear.toString(),
    A: ({ hours }) => toAMOrPM(hours).toUpperCase(),
    a: ({ hours }) => toAMOrPM(hours),
    HH: ({ hours }) => hours.toString().padStart(2, '0'),
    H: ({ hours }) => hours.toString(),
    hh: ({ hours }) => (hours % 12).toString().padStart(2, '0'),
    h: ({ hours }) => (hours % 12).toString(),
    mm: ({ minutes }) => minutes.toString().padStart(2, '0'),
    m: ({ minutes }) => minutes.toString(),
    ss: ({ seconds }) => seconds.toString().padStart(2, '0'),
    s: ({ seconds }) => seconds.toString(),
    SSS: ({ milliseconds }) => milliseconds.toString().substr(0, 3).padStart(3, '0'),
    SS: ({ milliseconds }) => milliseconds.toString().substr(0, 2).padStart(2, '0'),
    S: ({ milliseconds }) => milliseconds.toString().substr(0, 1),
    x: ({ time }) => time.toString(),
    X: ({ time }) => Math.floor(time / 1000).toString()
  }
  const tokens = []
  let stack = []
  const curr = tpl.split('')
  while(curr.length) {
    run()
  }

  function run() {
    switch (true) {
      case match('Y'):
        if(match('Y')) {
          if(match('Y')) {
            if(match('Y')) {
              make(T.YYYY, 4)
              return
            }
            prev()
          }

          make(T.YY, 2)
          return
        }
        return
      case match('M'):
        if (match('M')) {
          if (match('M')) {
            if (match('M')) {
              make(T.MMMM, 4)
              return
            }
            make(T.MMM, 3)
            return
          }
          make(T.MM, 2)
          return
        } else if (match('o')) {
          make(T.Mo, 2)
          return
        }
        make(T.M, 1)
        return
      case match('Q'):
        if(match('Q')) {
          make(T.QQ, 2)
          return
        } else if(match('o')) {
          make(T.Qo, 2)
          return
        }
        make(T.Q, 1)
        return

      case match('D'):
        if(match('D')) {
          if(match('D')) {
            if(match('D')) {
              make(T.DDDD, 4)
              return
            } else if(match('o')) {
              make(T.DDDo, 4)
              return
            }
            make(T.DDD, 3)
            return
          }
          make(T.DD, 2)
          return
        } else if(match('o')) {
          make(T.Do, 2)
          return
        }
        make(T.D, 1)
        return
      case match('d'):
        if(match('d')) {
          if(match('d')) {
            if(match('d')) {
              make(T.dddd, 4)
              return
            }
            make(T.ddd, 3)
            return
          }
          make(T.dd, 2)
          return
        } else if(match('o')) {
          make(T.do, 2)
          return
        }
        make(T.d, 1)
        return
      case match('w'):
        if(match('w')) {
          make(T.ww, 2)
          return
        } else if(match('o')) {
          make(T.wo, 2)
          return
        }
        make(T.w, 1)
        return
      case match('A'):
        make(T.A, 1)
        return
      case match('a'):
        make(T.a, 1)
        return
      case match('H'):
        if(match('H')) {
          make(T.HH, 2)
          return
        }
        make(T.H, 1)
        return
      case match('h'):
        if(match('h')) {
          make(T.hh, 2)
          return
        }
        make(T.h, 1)
        return
      case match('m'):
        if(match('m')) {
          make(T.mm, 2)
          return
        }
        make(T.m, 1)
        return
      case match('s'):
        if(match('s')) {
          make(T.ss, 2)
          return
        }
        make(T.s, 1)
        return
      case match('s'):
        if(match('s')) {
          if(match('s')) {
            make(T.sss, 3)
            return
          }
          make(T.ss, 2)
          return
        }
        make(T.s, 1)
        return
      case match('X'):
        make(T.X, 1)
        return
      case match('x'):
        make(T.x, 1)
        return
      default:
        next()
        return
    }
  }

  function prev() {
    curr.unshift(stack.pop())
  }

  function next() {
    const fst = curr.shift()
    if(!fst) {
      return null
    }
    stack.push(fst)
    return fst
  }

  function match(char) {
    const nn = next()
    if(nn) {
      if (char === nn) {
        return true
      } else {
        prev()
        return false
      }
    } else {
      return false
    }
  }

  function make(token, len) {
    if(token) {
      for(let i = 0; i < len; i++) {
        stack.pop()
      }
    }
    if(stack.length) {
      const str = stack.join('')
      tokens.push(() => str)
    }
    if(token) {
      tokens.push(token)
    }
    stack = []
  }

  return function datefmt1(date: Date): string {
    /**
     * from native Date api
     */
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const week = date.getDay()
    const day = date.getDate()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const milliseconds = date.getMilliseconds()
    const time = date.getTime()

    /**
     * compute more data
     */
    const quarter = toQuarter(month)
    const dayofyear = ofYear(year, time)
    const weekofyear = ofYear(year, time, 7)

    const ctx = {
      year,
      month,
      week,
      day,
      hours,
      minutes,
      seconds,
      milliseconds,
      time,
      quarter,
      dayofyear,
      weekofyear
    }

    return tokens.map(tok => tok(ctx)).join('')
  }
}

function toMonth(m: number): [string, string] {
  switch(m) {
    case 1: return 'January'
    case 2: return 'February'
    case 3: return 'March'
    case 4: return 'April'
    case 5: return 'May'
    case 6: return 'June'
    case 7: return 'July'
    case 8: return 'August'
    case 9: return 'September'
    case 10: return 'October'
    case 11: return 'November'
    case 12: return 'December'
    default:
      throw new Error(
        `Unknow month "${m}" at month name parse`
      )
  }
}

function toWeekDay(d: number): string {
  switch(d) {
    case 0: return 'Sunday'
    case 1: return 'Monday'
    case 2: return 'Tuesday'
    case 3: return 'Wednesday'
    case 4: return 'Thursday'
    case 5: return 'Friday'
    case 6: return 'Saturday'
    default:
      throw new Error(
        `Unknow day "${d}" at day name parse`
      )
  }
}

function toQuarter(m: number): number {
  switch(m) {
    case 1:
    case 2:
    case 3:
      return 1
    case 4:
    case 5:
    case 6:
      return 2
    case 7:
    case 8:
    case 9:
      return 3
    case 10:
    case 11:
    case 12:
      return 4
    default:
      throw new Error(
        `Unknow month "${m}" at quarter parse`
      )
  }
}

function ofYear(year: number, time: number, week?: number = 1): number {
  return Math.floor(
    (time - Date.parse(year)) / (1000 * 60 * 60 * 24 * week)
  ) + 1
}

function toAMOrPM(hours: number): string {
  return hours > 12 ? 'pm' : 'am'
}


function toNumeral(m: number): string {
  const str = m.toString()

  switch(str.slice(-1)) {
    case '1': return str + 'st'
    case '2': return str + 'nd'
    case '3': return str + 'rd'
    default: return str + 'th'
  }
}

export default fake


/**
 * test
 */

import assert from 'assert'

describe('isDate', function() {
  it('should return true when input was Date and valid', function() {
    assert(isDate(new Date()))
  })

  it('should return false when input was Date and invalid', function() {
    assert(!isDate(new Date('23')))
  })
})

describe('toMonth', function() {
  it('should return month name', function() {
    assert('January' === toMonth(1))
  })

  it('should throw when month not in range 1-12', function() {
    assert.throws(() => {
      toMonth(0)
    }, /Unknow month "0" at month name parse/)
  })
})

describe('toQuarter', function() {
  it('should return quarter', function() {
    assert(1 === toQuarter(1))
    assert(4 === toQuarter(10))
  })

  it('should throw when month not in range 1-12', function() {
    assert.throws(() => {
      toQuarter(0)
    }, /Unknow month "0" at quarter parse/)
  })
})

describe('ofYear', function() {
  it('should return day of year', function() {
    const gen = ofYear(2018, new Date('2018-01-03').getTime())
    assert(3 === gen)
  })

  it('should return week of year', function() {
    const gen = ofYear(2018, new Date('2018-01-03').getTime(), 7)
    assert(1 === gen)
  })
})

describe('toNumeral', function() {
  it('should return numeral string', function() {
    assert('1st' === toNumeral(1))
    assert('12nd' === toNumeral(12))
    assert('33rd' === toNumeral(33))
    assert('14th' === toNumeral(14))
    assert('0th' === toNumeral(0))
  })
})

describe('datefmt', function() {
  it('should apply template', function() {
    assert('2018-18' === datefmt('YYYY-YY')(new Date('2018')))
    assert('January-Jan-1st-01-1' === datefmt('MMMM-MMM-Mo-MM-M')(new Date('2018-01')))
    assert('01-1-1st' === datefmt('QQ-Q-Qo')(new Date('2018-01-01')))
    assert('001-1st-1-01-1-1st' === datefmt('DDDD-DDDo-DDD-DD-D-Do')(new Date('2018-01-01')))
    assert('Monday-Mon-Mo-1-1st' === datefmt('dddd-ddd-dd-d-do')(new Date('2018-01-01')))
    assert('01-1-1st' === datefmt('ww-w-wo')(new Date('2018-01-01')))
    assert('PM-pm' === datefmt('A-a')(new Date('2018-01-01T14:00:00')))
    assert('14-14-02-2' === datefmt('HH-H-hh-h')(new Date('2018-01-01T14:00:00')))
    assert('02-2-02-2' === datefmt('mm-m-ss-s')(new Date('2018-01-01T14:02:02')))
    assert('1514764800-1514764800000' === datefmt('X-x')(new Date('2018')))
  })
})

describe('random date', function() {
  it('should gen random date', function() {
    const gen = fake()
    assert(gen)
    assert(gen instanceof Date)
  })

  it('should gen random date gte min', function() {
    const date = new Date('2018')
    const gen = fake({ min: date })
    assert(+gen >= +date)
  })

  it('should gen random date lte min', function() {
    const date = new Date('2018')
    const gen = fake({ max: date })
    assert(+gen <= +date)
  })

  it('should gen random date between min and max', function() {
    const mindate = new Date('2018-01')
    const maxdate = new Date('2018-10')
    const gen = fake({ min: mindate, max: maxdate })
    assert(+gen <= +maxdate && +gen >= +mindate)
  })

  it('should gen random date with format options', function() {
    const gen = fake({ format: 'YYYY-MM-DD' })
    assert(/\d{4}-\d{2}-\d{2}/.test(gen))
  })
})
