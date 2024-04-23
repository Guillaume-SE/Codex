export const validCoverFileExtension = ['png', 'webp', 'jpg', 'jpeg']

export const extension = [...validCoverFileExtension] as const

export type FileExtension = (typeof extension)[number]
