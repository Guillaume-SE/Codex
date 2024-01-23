import { string } from '@ioc:Adonis/Core/Helpers'
// import { ValidFileExtension } from 'App/Tools/Enums/FileExtension'


export function createFileName(): string {
  const timestamp = new Date().getTime().toString()
  const randomString = string.generateRandom(10)
  const fullName = `${timestamp}-${randomString}.jpg`

  return fullName
}
