const usageStatus = ['ok', 'warning', 'danger'] as const

export type UsageStatus = (typeof usageStatus)[number]
