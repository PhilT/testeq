import { assert, equal, deepEqual } from '../lib/assertions'

export default () => {
  return {
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
