import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { deleteProductRepositories } from '../../../companies/products/delete-product-repositories';

@Injectable()
export class PrismaProductDeleteRepository
  implements deleteProductRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async deleteProduct(
    companyId: string,
    userId: string,
    productId: string,
  ): Promise<any> {
    const company = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        members: {
          some: {
            userId,
            role: 'OWNER',
          },
        },
      },
    });

    if (!company) {
      throw new ForbiddenException(
        'Apenas o dono da empresa pode adicionar produtos.',
      );
    }

    const product = await this.prisma.product.delete({
      where: { id: productId },
    });

    return product;
  }
}
