import { run } from '../lib/runner'
import { deepEqual } from '../lib/assertions'

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
  }
}
