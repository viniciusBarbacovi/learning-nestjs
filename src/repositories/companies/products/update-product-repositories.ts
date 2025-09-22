export abstract class updateProductRepositories {
  abstract updateProduct(
    companyId: string,
    userId: string,
    productId: string,
    quantity: number,
    price: number,
  ): Promise<any>;
}
