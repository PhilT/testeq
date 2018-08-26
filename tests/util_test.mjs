import { equal, deepEqual } from '../lib/assertions'
import { mapObjects, flat, shallowFlat } from '../lib/util'

export default () => {
  return {
    'mapObjects iterates an array of objects and returns pairs as array': () => {
      const expected = [['a', 'b'], ['c', 'd']]
      const actual = mapObjects([{ a: 'b', c: 'd' }])
      return equal(expected.toString(), actual.toString())
    },

    'flat flattens a nested array to 1 level': () => {
      return deepEqual([1, 2], flat([[[1]], [[[2]]]]))
    },

    'shallowFlat flattens a single level of a nested array': () => {
      return deepEqual([[1, 2], [3, 4]], shallowFlat([[[1, 2]], [[3, 4]]]))
    }
  }
}
