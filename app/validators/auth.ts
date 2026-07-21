import vine from '@vinejs/vine'

// const email = () => vine.string().email().maxLength(254)
const username = () =>
  vine.string().trim().minLength(3).maxLength(30).alphaNumeric({
    allowSpaces: false,
    allowUnderscores: true,
    allowDashes: true,
  })
const password = () => vine.string().maxLength(255)

export const registerValidator = vine.create({
  // email: email().unique({ table: 'users', column: 'email' }),
  username: username().unique({ table: 'users', column: 'username', caseInsensitive: true }),
  password: password().minLength(8),
})

export const loginValidator = vine.create({
  username: username(),
  password: password(),
})
