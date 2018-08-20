import { readdirSync } from 'fs'

export function assert (expression) {
  return expression ? ['ok'] : ['not ok']
}

export function equal (expected, actual) {
  const result = expected === actual
  return result ? ['ok'] : [
    'not ok',
    `# Expected: ${expected}`,
    `#   Actual: ${actual}`
  ]
}

export function load (fileList) {
  const imports = fileList.map(async path => {
    const module = await import(`./tests/${path}`)
    return module.default()
  })

  return Promise.all(imports)
}

export function run (tests) {
  const results = Object.entries(tests[0]).map(([name, func], i) => {
    return `${func()} ${i + 1} ${name}`
  })

  return [testCount(results.length), ...results]
}

function testCount (count) {
  return `1..${count}`
}

const endsWithMjs = path => path.endsWith('.mjs')
const files = readdirSync('tests').filter(endsWithMjs)
const imports = load(files)
imports.then(tests => {
  const results = run(tests)
  results.forEach(result => { console.log(result) })
})
