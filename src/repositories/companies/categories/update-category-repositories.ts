export abstract class updateCategoriesRepositories {
  abstract updateCategory(
    companyId: string,
    userId: string,
    categoryId: string,
    name: string,
  ): Promise<any>;
}
