import vine from '@vinejs/vine'

export const createProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    description: vine.string().trim().maxLength(1000).optional(),
  })
)

export const updateProjectValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    description: vine.string().trim().maxLength(1000).optional(),
  })
)
