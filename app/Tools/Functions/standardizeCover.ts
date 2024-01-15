import sharp from 'sharp'

export async function standardize(coverTmp: string | undefined) {
  const sharpModification = sharp(coverTmp)
    .resize({
      height: 250
    })
    .toFormat('jpeg', { mozjpeg: true })
    .toBuffer()
  return sharpModification
}
