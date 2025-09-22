import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { updateProductRepositories } from '../../../companies/products/update-product-repositories';

@Injectable()
export class PrismaProductUpdateRepository
  implements updateProductRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async updateProduct(
    companyId: string,
    userId: string,
    productId: string,
    quantity: number,
    price: number,
  ): Promise<any> {
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

    const product = await this.prisma.product.update({
      where: { id: productId },
      data: { quantity, price },
    });

    return product;
  }
}
