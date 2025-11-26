import Expense from '#models/expense'

export default class ExpenseService {
  async getProjectExpenses(projectId: number) {
    const expenses = await Expense.query()
      .where('projectId', projectId)
      .preload('category', (query) => {
        query.preload('icon')
      })
      .preload('payer')
      .preload('currency')
      .preload('collaborators')
      .orderBy('created_at', 'desc')

    return expenses
  }

  async getExpense(expenseId: number) {
    const expense = await Expense.query()
      .where('id', expenseId)
      .preload('category', (query) => {
        query.preload('icon')
      })
      .preload('payer')
      .preload('currency')
      .preload('collaborators')
      .firstOrFail()

    return expense
  }

  async createExpense(
    projectId: number,
    data: {
      name: string
      categoryId: number
      payerId: number
      cost: number
      currencyId: number
      collaboratorIds: number[]
    }
  ) {
    const expense = await Expense.create({
      projectId,
      name: data.name,
      categoryId: data.categoryId,
      payerId: data.payerId,
      cost: data.cost,
      currencyId: data.currencyId,
    })

    // Attach collaborators
    if (data.collaboratorIds.length > 0) {
      await expense.related('collaborators').attach(data.collaboratorIds)
    }

    await expense.load('category', (query) => {
      query.preload('icon')
    })
    await expense.load('payer')
    await expense.load('currency')
    await expense.load('collaborators')

    return expense
  }

  async updateExpense(
    expenseId: number,
    data: {
      name?: string
      categoryId?: number
      payerId?: number
      cost?: number
      currencyId?: number
      collaboratorIds?: number[]
    }
  ) {
    const expense = await Expense.findOrFail(expenseId)

    // Update basic fields
    if (data.name !== undefined) expense.name = data.name
    if (data.categoryId !== undefined) expense.categoryId = data.categoryId
    if (data.payerId !== undefined) expense.payerId = data.payerId
    if (data.cost !== undefined) expense.cost = data.cost
    if (data.currencyId !== undefined) expense.currencyId = data.currencyId

    await expense.save()

    // Sync collaborators if provided
    if (data.collaboratorIds !== undefined) {
      await expense.related('collaborators').sync(data.collaboratorIds)
    }

    await expense.load('category', (query) => {
      query.preload('icon')
    })
    await expense.load('payer')
    await expense.load('currency')
    await expense.load('collaborators')

    return expense
  }

  async deleteExpense(expenseId: number) {
    const expense = await Expense.findOrFail(expenseId)
    await expense.delete()
  }
}
