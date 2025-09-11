export abstract class createProductRepositories {
  abstract createProduct(
    companyId: string,
    data: {
      name: string;
      description?: string;
      productId: string;
      quantity: number;
      price: number;
      categoryId: string;
    }
  ): Promise<any>;
}
