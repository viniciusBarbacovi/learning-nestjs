import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { deleteCategoriesRepositories } from '../../../companies/categories/delete-category-respositories';

@Injectable()
export class PrismaCaterogyDeleteRepository
  implements deleteCategoriesRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async deleteCategory(
    companyId: string,
    userId: string,
    categoryId: string,
  ): Promise<any> {
    const existingCategory = await this.prisma.category.findFirst({
      where: {
        id: categoryId,
        companyId: companyId,
        company: {
          members: {
            some: {
              userId: userId,
              role: 'OWNER',
            },
          },
        },
      },
      include: { _count: { select: { products: true } } },
    });

    if (!existingCategory) {
      throw new NotFoundException(
        'Category not found or does not belong to this company.',
      );
    }

    if (existingCategory._count.products > 0) {
      throw new BadRequestException(
        'Não é possível excluir a categoria, pois ela contém produtos.',
      );
    }

    const updatedCategory = await this.prisma.category.delete({
      where: { id: categoryId },
    });

    return updatedCategory;
  }
}
