export abstract class listProductRepositories {
  abstract listProduct(companyId: string, userId: string): Promise<any>;
}
