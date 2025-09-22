import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { listUniqueCategoriesRepositories } from '../../../companies/categories/list-unique-category-repositories';

@Injectable()
export class PrismaListUniqueCategoriesRepository
  implements listUniqueCategoriesRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async listUniqueCategory(
    companyId: string,
    userId: string,
    categoryId: string,
  ): Promise<any> {
    // Verifica se o usuário é membro da empresa (OWNER ou EMPLOYEE)
    const membership = await this.prisma.companyMember.findUnique({
      where: { userId_companyId: { userId, companyId } },
    });

    if (!membership)
      throw new ForbiddenException('User does not belong to this company');

    // Retorna apenas id e name das categorias
    return this.prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, companyId: true },
    });
  }
}
