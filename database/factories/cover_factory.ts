import { MediaFactory } from '#database/factories/media_factory'
import Cover from '#models/cover'
import factory from '@adonisjs/lucid/factories'

const defaultImages = [
  'default_01.jpg',
  'default_02.jpg',
  'default_03.jpg',
  'default_04.jpg',
  'default_05.jpg',
]
const defaultSmallImages = [
  'default_01-150x225.jpg',
  'default_02-150x225.jpg',
  'default_03-150x225.jpg',
  'default_04-150x225.jpg',
  'default_05-150x225.jpg',
]
const defaultMediumImages = [
  'default_01-300x450.jpg',
  'default_02-300x450.jpg',
  'default_03-300x450.jpg',
  'default_04-300x450.jpg',
  'default_05-300x450.jpg',
]
const defaultLargeImages = [
  'default_01-600x900.jpg',
  'default_02-600x900.jpg',
  'default_03-600x900.jpg',
  'default_04-600x900.jpg',
  'default_05-600x900.jpg',
]

export const CoverFactory = factory
  .define(Cover, async ({ faker }) => {
    const baseFilenameForOriginal = faker.helpers.arrayElement(defaultImages)
    const baseFilenameForSmall = faker.helpers.arrayElement(defaultSmallImages)
    const baseFilenameForMedium = faker.helpers.arrayElement(defaultMediumImages)
    const baseFilenameForLarge = faker.helpers.arrayElement(defaultLargeImages)

    return {
      originalCoverFilename: baseFilenameForOriginal,
      smallCoverFilename: baseFilenameForSmall,
      mediumCoverFilename: baseFilenameForMedium,
      largeCoverFilename: baseFilenameForLarge,
    }
  })
  .relation('media', () => MediaFactory)
  .build()
