import Category from '#models/category'
import Icon from '#models/icon'

export default class CategoryService {
  async getProjectCategories(projectId: number) {
    const categories = await Category.query().where('projectId', projectId).preload('icon')
    return categories
  }

  async getCategory(categoryId: number) {
    const category = await Category.query().where('id', categoryId).preload('icon').firstOrFail()
    return category
  }

  async createCategory(
    projectId: number,
    data: { name: string; description?: string; iconId: number }
  ) {
    const category = await Category.create({
      projectId,
      name: data.name,
      description: data.description,
      iconId: data.iconId,
    })

    await category.load('icon')
    return category
  }

  async updateCategory(
    categoryId: number,
    data: { name?: string; description?: string; iconId?: number }
  ) {
    const category = await Category.findOrFail(categoryId)
    category.merge(data)
    await category.save()
    await category.load('icon')

    return category
  }

  async deleteCategory(categoryId: number) {
    const category = await Category.findOrFail(categoryId)
    await category.delete()
  }

  async getAllIcons() {
    const icons = await Icon.all()
    return icons
  }

  async getIconById(iconId: number) {
    const icon = await Icon.findOrFail(iconId)
    return icon
  }
}
