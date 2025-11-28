import vine from '@vinejs/vine'

export const createExpenseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    categoryId: vine.number().positive(),
    payerId: vine.number().positive(),
    cost: vine.number().positive().decimal([0, 2]),
    currencyId: vine.number().positive(),
    collaboratorIds: vine.array(vine.number().positive()),
  })
)

export const updateExpenseValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    categoryId: vine.number().positive().optional(),
    payerId: vine.number().positive().optional(),
    cost: vine.number().positive().decimal([0, 2]).optional(),
    currencyId: vine.number().positive().optional(),
    collaboratorIds: vine.array(vine.number().positive()).optional(),
  })
)
