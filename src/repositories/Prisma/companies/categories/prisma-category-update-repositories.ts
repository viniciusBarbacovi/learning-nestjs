import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { updateCategoriesRepositories } from '../../../companies/categories/update-category-repositories';
import { randomBytes } from 'crypto';

@Injectable()
export class PrismaCaterogyUpdateRepository
  implements updateCategoriesRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async updateCategory(
    companyId: string,
    userId: string,
    categoryId: string,
    name: string,
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
    });

    if (!existingCategory || existingCategory.companyId !== companyId) {
      throw new NotFoundException(
        'Category not found or does not belong to this company.',
      );
    }

    if (existingCategory.name === name) {
      return existingCategory;
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id: categoryId },
      data: {
        name,
        updatedAt: new Date(),
      },
    });

    return updatedCategory;
  }
}
