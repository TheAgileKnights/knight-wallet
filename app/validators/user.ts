import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    id: vine.string(),
    email: vine.string().email().maxLength(254),
    name: vine.string().minLength(3).maxLength(255),
    avatarUrl: vine.string().url().maxLength(2048),
  })
)
