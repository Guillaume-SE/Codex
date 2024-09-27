export interface ICategoryRelatedMediaData {
  platformId?: number | null
  duration?: number | null
  pages?: number | null
  animeSeasonLength?: number | null
  seriesSeasonLength?: number | null
}

export interface IGameInfos {
  platformId: number | null
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
