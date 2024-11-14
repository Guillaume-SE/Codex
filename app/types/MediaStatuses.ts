const status = ['en cours', 'terminé', 'en pause', 'abandonné', 'prévu', 'attendu'] as const
// const status = ['in progress', 'completed', 'paused', 'dropped', 'planned', 'anticipated'] as const

export type MediaStatuses = (typeof status)[number]

export { status as validMediaStatus }
