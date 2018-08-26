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


