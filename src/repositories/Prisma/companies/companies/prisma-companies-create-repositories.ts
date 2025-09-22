import { createCompaniesRepositories } from '../../../companies/companies/create-companies-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class prismaCompaniesCreateRepositories
  implements createCompaniesRepositories
{
  constructor(private prisma: PrismaService) {}

  async create(name: string, userId: string): Promise<any> {
    try {
      const company = await this.prisma.company.create({
        data: {
          id: randomUUID(),
          name,
          members: {
            create: {
              id: randomUUID(),
              userId,
              role: 'OWNER',
            },
          },
        },
      });
      return { id: company.id, name: company.name };
    } catch (error) {
      if (error.code === 'P2002') {
        return { error: 'Company with this name already exists.' };
      }
      throw new Error('An unexpected error occurred.');
    }
  }
}
