export abstract class deleteProductRepositories {
  abstract deleteProduct(
    companyId: string,
    userId: string,
    productId: string,
  ): Promise<any>;
}
