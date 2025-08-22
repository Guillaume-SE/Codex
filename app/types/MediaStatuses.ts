const status = ['en cours', 'terminé', 'en pause', 'abandonné', 'prévu'] as const
// const status = ['in progress', 'completed', 'paused', 'dropped', 'planned'] as const

export type MediaStatuses = (typeof status)[number]
