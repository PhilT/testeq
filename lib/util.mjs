export const mapObjects = array => array.map(objects => Object.entries(objects))

export function flat (array) {
  return array.reduce(
    (acc, val) => Array.isArray(val)
      ? acc.concat(flat(val))
      : acc.concat(val), []
  )
}

export function shallowFlat (array) {
  return array.reduce((acc, val) => acc.concat(val), [])
}
