#!/bin/sh
":" //# comment; exec /usr/bin/env node --experimental-modules "$0" "$@"
import { readdirSync } from 'fs'
import { load, run } from '../index.mjs'

const endsWithMjs = path => path.endsWith('.mjs')
const files = readdirSync('tests').filter(endsWithMjs)
const imports = load(files)

// SIDE EFFECTS!!
imports.then(files => {
  const results = run(files)
  console.log(results.join('\n'))
})
