import { getCompaniesByUserRepositories } from '../../../companies/companies/get-companies-by-user-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class prismaCompaniesGetByUserRepositories
  implements getCompaniesByUserRepositories
{
  constructor(private prisma: PrismaService) {}

  async get(userId: string): Promise<any> {
    try {
      const company = await this.prisma.companyMember.findMany({
        where: {
          userId,
        },
        select: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          role: true,
        },
      });
      return { company };
    } catch (error) {
      if (error.code === 'P2002') {
        return { error: 'Company with this name already exists.' };
      }
      throw new Error('An unexpected error occurred.');
    }
  }
}
