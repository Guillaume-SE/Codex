import { Env } from '@adonisjs/core/env'

export default await Env.create(new URL('../', import.meta.url), {
  NODE_ENV: Env.schema.enum(['development', 'production', 'test'] as const),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  HOST: Env.schema.string({ format: 'host' }),
  LOG_LEVEL: Env.schema.string(),

  SESSION_DRIVER: Env.schema.enum(['cookie', 'memory'] as const),

  DB_HOST: Env.schema.string({ format: 'host' }),
  DB_PORT: Env.schema.number(),
  DB_USER: Env.schema.string(),
  DB_PASSWORD: Env.schema.string.optional(),
  DB_DATABASE: Env.schema.string(),

  DEFAULT_COVER_EXTENSION: Env.schema.string(),
  UPLOAD_BASE_PATH_DIR: Env.schema.string(),
  ORIGINAL_COVER_DIR: Env.schema.string(),
  SMALL_COVER_DIR: Env.schema.string(),
  MEDIUM_COVER_DIR: Env.schema.string(),
  LARGE_COVER_DIR: Env.schema.string(),

  /*
  |----------------------------------------------------------
  | Variables for configuring the drive package
  |----------------------------------------------------------
  */
  DRIVE_DISK: Env.schema.enum(['fs'] as const),
})
