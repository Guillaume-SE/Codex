const platform = [
  'Xbox',
  'Xbox 360',
  'Xbox One',
  'Xbox Series X',
  'Xbox Series S',
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
  'Mobile',
] as const

export type GamePlatform = (typeof platform)[number]
