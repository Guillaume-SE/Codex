import sharp from 'sharp'

export async function standardize(coverTmp: string | undefined) {
  const sharpModification = sharp(coverTmp)
    .resize({
      height: 480,
      width: 320,
      fit: 'fill',
    })
    .toFormat('jpg', { mozjpeg: true })
    .toBuffer()
  return sharpModification
}
