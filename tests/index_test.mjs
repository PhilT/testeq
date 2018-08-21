import { run, assert, equal, deepEqual } from '../index.mjs'

const exampleTests = {
  'example test': () => {
    return ['ok']
  },

  'second example': () => {
    return ['not ok', '# some explanation']
  }
}

export default () => {
  return {
    'load loads this test file': () => {
      return assert(true)
    },

    'run runs the test suite': () => {
      const result = run([exampleTests])
      return deepEqual(['1..2',
        'ok 1 example test',
        'not ok 2 second example',
        '# some explanation'
      ], result)
    },

    'equal returns "ok" for matching parameters': () => {
      const expected = 'ok'
      const actual = equal(1, 1).join('--')
      return assert(expected === actual)
    },

    'equal returns "not ok" for non matching parameters': () => {
      const expected = 'not ok--# Expected: 1--#   Actual: 2'
      const actual = equal(1, 2).join('--')
      return assert(expected === actual)
    },

    'deepEqual returns "ok" when arrays match': () => {
      const expected = 'ok'
      const actual = deepEqual([1, 2], [1, 2]).join('--')
      return assert(expected === actual)
    },

    'deepEqual return "not ok" when arrays do not match': () => {
      const expected = 'not ok--# Expected: [1,2]--#   Actual: [1,1]'
      const actual = deepEqual([1, 2], [1, 1]).join('--')
      return assert(expected === actual)
    },

    'deepEqual return "ok" when objects match': () => {
      const expected = 'ok'
      const actual = deepEqual({a: 1, b: 2}, {a: 1, b: 2}).join('--')
      return assert(expected === actual)
    }
  }
}
