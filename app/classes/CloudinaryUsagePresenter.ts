import { ICloudinaryUsage } from '#interfaces/cloudinary_usage_interface'
import { formatBytes } from '#utils/formatBytesTo'
import { formatToRelative } from '#utils/formatDate'

export class CloudinaryUsagePresenter {
  plan: string
  lastUpdated: string
  credits: {
    usage: number
    limit: number
    display: string
    status: 'ok' | 'warning' | 'danger'
  }
  breakdown: {
    transformations: {
      usage: number
      creditsUsage: number
      percentOfLimit: number
      display: string
    }
    bandwidth: {
      usage: number
      creditsUsage: number
      percentOfLimit: number
      display: string
    }
    storage: {
      usage: number
      creditsUsage: number
      percentOfLimit: number
      display: string
    }
  }
  resources: {
    stored: number
    display: string
  }

  constructor(usage: ICloudinaryUsage) {
    const creditLimit = usage.credits.limit
    const adjustedTotalCredits = Math.max(0, usage.credits.usage)
    const transformationCredits = Math.max(0, usage.transformations.credits_usage)
    const bandwidthCredits = Math.max(0, usage.bandwidth.credits_usage)
    const storageCredits = Math.max(0, usage.storage.credits_usage)

    let creditStatus: 'ok' | 'warning' | 'danger'
    if (adjustedTotalCredits <= 20) {
      creditStatus = 'ok'
    } else if (adjustedTotalCredits <= 24) {
      creditStatus = 'warning'
    } else {
      creditStatus = 'danger'
    }

    this.plan = usage.plan
    this.lastUpdated = `Mise à jour ${formatToRelative(usage.last_updated)}`

    this.credits = {
      usage: adjustedTotalCredits,
      limit: creditLimit,
      display: `${usage.credits.usage} / ${creditLimit} crédits utilisés`,
      status: creditStatus,
    }

    this.breakdown = {
      transformations: {
        usage: usage.transformations.usage,
        creditsUsage: transformationCredits,
        percentOfLimit: (transformationCredits / creditLimit) * 100,
        display: `${usage.transformations.usage.toLocaleString('fr-FR')}`,
      },
      bandwidth: {
        usage: usage.bandwidth.usage,
        creditsUsage: bandwidthCredits,
        percentOfLimit: (bandwidthCredits / creditLimit) * 100,
        display: formatBytes(usage.bandwidth.usage),
      },
      storage: {
        usage: usage.storage.usage,
        creditsUsage: storageCredits,
        percentOfLimit: (storageCredits / creditLimit) * 100,
        display: formatBytes(usage.storage.usage),
      },
    }
    this.resources = {
      stored: usage.resources,
      display: `${usage.resources.toLocaleString('fr-FR')} fichiers stockés`,
    }
  }

  static present(usage: ICloudinaryUsage): CloudinaryUsagePresenter {
    return new CloudinaryUsagePresenter(usage)
  }
}
