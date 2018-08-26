import { dirname, join } from 'path'
import { existsSync } from 'fs'
import { flat, shallowFlat, mapObjects } from './util.mjs'
import { ok } from './colours.mjs'

const __dirname = dirname(new URL(import.meta.url).pathname)
const projectPath = __dirname.match(/node_modules/) && __dirname.match(/(.+)\/node_modules/)[1]

export function load (fileList) {
  const projectRoot = projectPath || dirname(__dirname)
  console.log(projectRoot)

  const imports = fileList.map(async filepath => {
    const module = await import(`${projectRoot}/tests/${filepath}`)
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

