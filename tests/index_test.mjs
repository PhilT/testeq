import { run, assert, equal, deepEqual } from '../index.mjs'

const exampleTests = {
  'example test': () => {
    return [true]
  },

  'second example': () => {
    return [false, '# some explanation']
  }
}

function runWithColor (color) {
  const oldArgvValue = process.argv[2]
  process.argv[2] = color ? '' : '--no-color'
  const result = run([exampleTests])
  process.argv[2] = oldArgvValue
  return result
}

export default () => {
  return {
    'load loads this test file': () => {
      return assert(true)
    },

    'run runs the test suite with color': () => {
      return deepEqual(['1..2',
        '\x1b[32mok\x1b[0m 1 example test',
        '\x1b[31mnot ok\x1b[0m 2 second example',
        '# some explanation'
      ], runWithColor(true))
    },

    'run runs the test suite without color': () => {
      return deepEqual(['1..2',
        'ok 1 example test',
        'not ok 2 second example',
        '# some explanation'
      ], runWithColor(false))
    },

    'equal returns "ok" for matching parameters': () => {
      const expected = 'true'
      const actual = equal(1, 1).join('--')
      return assert(expected === actual)
    },

    'equal returns "not ok" for non matching parameters': () => {
      const expected = 'false--# Expected: 1--#   Actual: 2'
      const actual = equal(1, 2).join('--')
      return assert(expected === actual)
    },

    'deepEqual returns "ok" when arrays match': () => {
      const expected = 'true'
      const actual = deepEqual([1, 2], [1, 2]).join('--')
      return assert(expected === actual)
    },

    'deepEqual return "not ok" when arrays do not match': () => {
      const expected = 'false--# Expected: [1,2]--#   Actual: [1,1]'
      const actual = deepEqual([1, 2], [1, 1]).join('--')
      return assert(expected === actual)
    },

    'deepEqual return "ok" when objects match': () => {
      const expected = 'true'
      const actual = deepEqual({a: 1, b: 2}, {a: 1, b: 2}).join('--')
      return assert(expected === actual)
    }
  }
}
