import string from '@adonisjs/core/helpers/string'

export function createFileName(): string {
  const timestamp = new Date().getTime().toString()
  const randomString = string.random(15)
  const fullName = `${timestamp}-${randomString}`

  return fullName
}
