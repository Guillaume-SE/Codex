import sharp from 'sharp'

export async function resize(path: string | undefined, height: number, width: number) {
  const sharpModification = sharp(path)
    .resize({
      height: height,
      width: width,
      fit: 'cover',
      position: 'top',
    })
    .toFormat('jpg', { mozjpeg: true })
    .toBuffer()
  return sharpModification
}

export async function toBuffer(path: string | undefined) {
  return sharp(path).toBuffer()
}
