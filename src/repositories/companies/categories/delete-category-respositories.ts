export abstract class deleteCategoriesRepositories {
  abstract deleteCategory(
    companyId: string,
    userId: string,
    categoryId: string,
  ): Promise<any>;
}
