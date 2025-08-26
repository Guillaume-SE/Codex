const status = ['en cours', 'terminé', 'en pause', 'arrêté', 'prévu'] as const
// const status = ['in progress', 'completed', 'on-hold', 'dropped', 'planned'] as const

export type MediaStatuses = (typeof status)[number]
