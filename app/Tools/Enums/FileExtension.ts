const extension = [
    'png',
    'jpg',
    'jpeg',
    'webp'
] as const

export type FileExtension = typeof extension[number]
export { extension as validFileExtension }