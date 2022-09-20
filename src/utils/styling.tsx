import { darken, lighten } from 'polished'

export const contrast = (amount: number | string, color: string, contrast: contrast): string => {
  const resultFunc = contrast === 'white' ? lighten : darken
  return resultFunc(amount, color)
}
