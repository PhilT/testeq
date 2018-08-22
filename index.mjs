import { readdirSync } from 'fs'
import { flat, shallowFlat, mapObjects } from './lib/util.mjs'
import { ok } from './lib/colours.mjs'

export function assert (expression) {
  return [!!expression]
}

export function equal (expected, actual) {
  const result = expected === actual
  return result ? [true] : [
    false,
    `# Expected: ${expected}`,
    `#   Actual: ${actual}`
  ]
}

export function deepEqual (expected, actual) {
  return equal(JSON.stringify(expected), JSON.stringify(actual))
}

export function load (fileList) {
  const imports = fileList.map(async path => {
    const module = await import(`./tests/${path}`)
    return module.default()
  })

  return Promise.all(imports)
}

export function run (files) {
  const results = shallowFlat(mapObjects(files)).map(([name, func], i) => {
    const [success, ...diag] = func()
    return [`${ok(success)} ${i + 1} ${name}`, ...diag]
  })

  return [testCount(results.length), ...flat(results)]
}

function testCount (count) {
  return `1..${count}`
}

// run fn for each element
// TODO: Move these to util
const endsWithMjs = path => path.endsWith('.mjs')
const files = readdirSync('tests').filter(endsWithMjs)
const imports = load(files)

// SIDE EFFECTS!!
imports.then(files => {
  const results = run(files)
  console.log(results.join('\n'))
})
