// import { BaseModel, BelongsTo, HasMany, belongsTo, hasMany } from '@ioc:Adonis/Lucid/Orm'
// import Database from '@ioc:Adonis/Lucid/Database'
// import { test } from '@japa/runner'

// test('adonis recursive entity', async ({ assert }) => {
//   class Media extends BaseModel {
//     // media_parent_id est composé de mediaId
//     @belongsTo(() => Media)
//     public childrenMedia: BelongsTo<typeof Media>

//     // mediaId peut avoir plusieurs enfant dans media_parent_id
//     @hasMany(() => Media)
//     public parentMedia: HasMany<typeof Media>
//   }

//   Media.boot()

//   const got = new Media()
//   const got_s1 = new Media()
//   const rel = Media.$getRelation('parentMedia')
//   rel.boot()
//   rel.setRelated(got, [got_s1])

//   console.log('got:', got)
//   console.log('got_s1:', got_s1)
//   assert.equal(2 + 2, 4) // Assert un truc
// })
