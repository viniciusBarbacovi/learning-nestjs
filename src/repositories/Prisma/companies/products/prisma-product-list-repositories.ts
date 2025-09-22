import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { listProductRepositories } from '../../../companies/products/list-product-repositories';

@Injectable()
export class PrismaProductListRepository implements listProductRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async listProduct(companyId: string, userId: string): Promise<any> {
    const company = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        members: {
          some: {
            userId,
          },
        },
      },
    });

    if (!company) {
      throw new ForbiddenException(
        'Apenas o dono da empresa pode adicionar produtos.',
      );
    }

    const product = await this.prisma.product.findMany({
      where: { companyId },
    });

    return product;
  }
}
