import sharp from 'sharp'

export async function resize(path: string, width: number) {
  const sharpModification = sharp(path)
    .resize({
      // height: 500,
      width: width,
      // fit: 'cover',
      // position: 'top',
    })
    .toFormat('jpg', { mozjpeg: true })
    .toBuffer()
  return sharpModification
}

export async function toBuffer(path: string) {
  return sharp(path).toBuffer()
}
