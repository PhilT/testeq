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
  return Object.keys(tests[0]).map((test, i) => {
    const result = tests[0][test]()
    return `${result[0]} ${i + 1} ${test}`
  })
}

function testCount (count) {
  return `1..${count}`
}

const imports = load(readdirSync('tests'))
imports.then(tests => {
  console.log(testCount(tests.length))
  const results = run(tests)
  results.forEach(result => { console.log(result) })
})
