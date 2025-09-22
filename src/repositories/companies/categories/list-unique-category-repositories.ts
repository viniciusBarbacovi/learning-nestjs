export abstract class listUniqueCategoriesRepositories {
  abstract listUniqueCategory(
    companyId: string,
    userId: string,
    categoryId: string,
  ): Promise<any>;
}
