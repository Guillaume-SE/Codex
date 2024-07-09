export interface IMediaSpecificInfos {
  platformId?: number
  pages?: number | null
  animeSeasonLength?: number | null
  seriesSeasonLength?: number | null
  duration?: number | null
}

export interface IGameInfos {
  platformId: number
}

export interface IBookInfos {
  pages: number | null
}

export interface IAnimeInfos {
  animeSeasonLength: number | null
}

export interface ISeriesInfos {
  seriesSeasonLength: number | null
}

export interface IMovieInfos {
  duration: number | null
}
