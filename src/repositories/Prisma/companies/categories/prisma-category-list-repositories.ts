import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { ListCategoriesRepositories } from '../../../companies/categories/list-category-repositories';

@Injectable()
export class PrismaCategoriesRepository implements ListCategoriesRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async listManyCategories(
    companyId: string,
    userId: string,
  ): Promise<{ id: string; name: string }[]> {
    // Verifica se o usuário é membro da empresa (OWNER ou EMPLOYEE)
    const membership = await this.prisma.companyMember.findUnique({
      where: { userId_companyId: { userId, companyId } },
    });

    if (!membership)
      throw new ForbiddenException('User does not belong to this company');

    // Retorna apenas id e name das categorias
    return this.prisma.category.findMany({
      where: { companyId },
      select: { id: true, name: true },
    });
  }
}

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from 'src/Database/prisma.service';
// import { listCategoriesRepository } from '../../companies/list-category-repositories';

// @Injectable()
// export class PrismaCategoriesListRepository implements listCategoriesRepository {
//   constructor(private prisma: PrismaService) {}

//   async list(companyId: string): Promise<{ id: string; name: string }[]> {
//     const categories = await this.prisma.category.findMany({
//       where: { companyId },
//       select: {
//         id: true,
//         name: true,
//       },
//     });
//     return categories;
//   }
// }
