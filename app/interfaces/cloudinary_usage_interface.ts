export interface ICloudinaryUsage {
  plan: string
  last_updated: string
  date_requested: string
  transformations: {
    usage: number
    credits_usage: number
    breakdown: { transformation: number }
  }
  objects: { usage: number }
  bandwidth: { usage: number; credits_usage: number }
  storage: { usage: number; credits_usage: number }
  impressions: { usage: number; credits_usage: number }
  seconds_delivered: { usage: number; credits_usage: number }
  credits: { usage: number; limit: number; used_percent: number }
  resources: number
  derived_resources: number
  requests: number
  media_limits: {
    image_max_size_bytes: number
    video_max_size_bytes: number
    raw_max_size_bytes: number
    image_max_px: number
    asset_max_total_px: number
  }
  rate_limit_allowed: number
  rate_limit_reset_at: string
  rate_limit_remaining: number
}
