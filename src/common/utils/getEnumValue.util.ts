import { color } from 'src/modules/todo/types'

export function getColorEnumValue(str: color) {
  return Number.isInteger(str) ? str : Number.parseInt(color[str])
}
