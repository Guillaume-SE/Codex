import string from '@adonisjs/core/helpers/string'

export function generateUniqueString() {
  const timestamp = new Date().getTime().toString()
  const randomString = string.random(15)

  return `${timestamp}-${randomString}`
}
