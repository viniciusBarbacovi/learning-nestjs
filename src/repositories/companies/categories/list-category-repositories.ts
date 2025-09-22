export abstract class ListCategoriesRepositories {
  abstract listManyCategories(
    companyId: string,
    userId: string,
  ): Promise<{ id: string; name: string }[]>;
}
