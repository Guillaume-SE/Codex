const extension = [
    'png',
    'jpg',
    'jpeg',
    'webp'
] as const

export type ValidFileExtension = typeof extension[number]