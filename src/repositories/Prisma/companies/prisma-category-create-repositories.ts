import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { createCategoryRepository } from '../../companies/create-category-repositories';

@Injectable()
export class PrismaCategoriesCreateRepository implements createCategoryRepository {
  constructor(private prisma: PrismaService) {}

  async checkUserIsOwner(userId: string, companyId: string): Promise<boolean> {
    const membership = await this.prisma.companyMember.findUnique({
      where: { userId_companyId: { userId, companyId } },
    });
    return membership?.role === 'OWNER';
  }

  async create(companyId: string, name: string) {
    return this.prisma.category.create({
      data: {
        name,
        companyId,
      },
    });
  }
}
