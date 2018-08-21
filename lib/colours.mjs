export function green (text) {
  return `${GREEN}${text}${NORMAL}`
}

export function red (text) {
  return `${RED}${text}${NORMAL}`
}

const NORMAL = '\x1b[0m'
const GREEN = '\x1b[32m'
const RED = '\x1b[31m'

export const OK = green('ok')
export const NOTOK = red('not ok')
