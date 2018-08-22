export function ok (success) {
  return success ? color(GREEN, 'ok') : color(RED, 'not ok')
}

function color (color, text) {
  return useColor() ? `${color}${text}${NORMAL}` : text
}

const useColor = () => process.argv.indexOf('--no-color') === -1

const NORMAL = '\x1b[0m'
const GREEN = '\x1b[32m'
const RED = '\x1b[31m'
