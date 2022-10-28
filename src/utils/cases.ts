import { snakeCase } from 'change-case'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToSnake = (obj: any) => {
  const newObj = {}
  for (const key of Object.keys(obj)) {
    delete Object.assign(newObj, obj, { [snakeCase(key)]: obj[key] })[key]
  }
  return newObj
}
