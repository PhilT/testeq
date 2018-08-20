import { run, assert, equal } from '../index.mjs'

const exampleTests = [{
  'example test': () => {
    return assert(true)
  },

  'second example': () => {
    return ['ok']
  }
}]

export default () => {
  return {
    'load loads this test file': () => {
      return assert(true)
    },

    'run runs the test suite': () => {
      const result = run(exampleTests)
      return assert(result.join('\n') === '1..2\nok 1 example test\nok 2 second example')
    },

    'equal returns "ok" for matching parameters': () => {
      return assert(equal(1, 1).join() === 'ok')
    },

    'equal returns "not ok" for non matching parameters': () => {
      return assert(equal(1, 2).join('\n') === 'not ok\n# Expected: 1\n#   Actual: 2')
    }
  }
}
