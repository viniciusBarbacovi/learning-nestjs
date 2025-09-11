import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { createProductRepositories } from 'src/repositories/companies/create-product-repositories';

@Injectable()
export class PrismaInventoryRepositories implements createProductRepositories {
  constructor(private prisma: PrismaService) {}

  async createProduct(companyId: string, data: any) {
    return this.prisma.product.create({
      data: {
        ...data,
        companyId,
      },
    });
  }
}
