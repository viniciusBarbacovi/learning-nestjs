export abstract class createCategoryRepository {
  abstract create(companyId: string, name: string): Promise<any>;
  abstract checkUserIsOwner(userId: string, companyId: string): Promise<boolean>;
}