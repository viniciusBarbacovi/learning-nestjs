export abstract class CategoriesRepositories {
  abstract listByCompany(companyId: string, userId: string): Promise<{ id: string; name: string }[]>;
}