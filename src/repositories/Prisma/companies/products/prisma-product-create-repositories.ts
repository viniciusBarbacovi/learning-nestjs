import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { createProductRepositories } from '../../../companies/products/create-product-repositories';

@Injectable()
export class PrismaProductCreateRepository
  implements createProductRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(
    companyId: string,
    userId: string,
    name: string,
    description: string,
    productId: string,
    quantity: number,
    price: number,
    categoryId: string,
  ): Promise<any> {
    // 🔒 Verifica se usuário é OWNER da empresa
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

    // 🔎 Verifica se categoria pertence à empresa
    const category = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        companyId,
      },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada na empresa.');
    }

    // ✅ Cria produto
    const product = await this.prisma.product.create({
      data: {
        name,
        description,
        productId,
        quantity,
        price,
        companyId,
        categoryId,
      },
    });

    return product;
  }
}
