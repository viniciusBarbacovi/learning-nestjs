export abstract class createProductRepositories {
  abstract createProduct(
    companyId: string,
    userId: string,
    name: string,
    description: string | null,
    productId: string,
    quantity: number,
    price: number,
    categoryId: string,
  ): Promise<any>;
}
