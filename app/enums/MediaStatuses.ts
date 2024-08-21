const status = ['En cours', 'Terminé', 'En pause', 'Abandonné', 'Prévu', 'Attendu'] as const

export type MediaStatus = (typeof status)[number]

export { status as validMediaStatus }
