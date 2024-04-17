import sharp from 'sharp'

export async function resize(path: string | undefined) {
  const sharpModification = sharp(path)
    .resize({
      height: 480,
      width: 320,
      fit: 'fill',
    })
    .toFormat('jpg', { mozjpeg: true })
    .toBuffer()
  return sharpModification
}

export async function toBuffer(path: string | undefined) {
  const sharpModification = sharp(path).toBuffer()
  return sharpModification
}
