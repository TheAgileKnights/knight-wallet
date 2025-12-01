import { test } from '@japa/runner'
import CategoryService from '#services/category_service'

test.group('Category Service', () => {
  test('service can be instantiated', ({ assert }) => {
    const categoryService = new CategoryService()

    assert.instanceOf(categoryService, CategoryService)
    assert.isFunction(categoryService.getProjectCategories)
    assert.isFunction(categoryService.createCategory)
  })

  test('service has all required methods', ({ assert }) => {
    const categoryService = new CategoryService()

    assert.isFunction(categoryService.getProjectCategories)
    assert.isFunction(categoryService.getCategory)
    assert.isFunction(categoryService.createCategory)
    assert.isFunction(categoryService.updateCategory)
    assert.isFunction(categoryService.deleteCategory)
    assert.isFunction(categoryService.getAllIcons)
    assert.isFunction(categoryService.getIconById)
  })
})
