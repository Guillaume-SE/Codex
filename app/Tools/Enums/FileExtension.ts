export const extension = ['png', 'jpg', 'jpeg', 'webp'] as const

export type FileExtension = (typeof extension)[number]

export const validCoverFileExtension = ['png', 'webp', 'jpg', 'jpeg']
