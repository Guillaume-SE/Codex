const platform = [
  'Xbox',
  'Xbox 360',
  'Xbox One',
  'Xbox Series X',
  'PlayStation',
  'PlayStation 2',
  'PlayStation 3',
  'PlayStation 4',
  'PlayStation 5',
  'PSP',
  'PlayStation Vita',
  'Sega Saturn',
  'Game Boy Advance',
  'Nintendo DS',
  'Nintendo Switch',
  'PC',
  'Android',
  'iOS',
  'Emulateur',
] as const

export type GamePlatform = (typeof platform)[number]
export { platform as validGamePlatform }
