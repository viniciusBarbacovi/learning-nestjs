import { getCompaniesMembersRepositories } from '../../../companies/companies/get-members-by-companies-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class prismaCompaniesGetMembersRepositories
  implements getCompaniesMembersRepositories
{
  constructor(private prisma: PrismaService) {}

  async getMembers(userId: string, companyId: string): Promise<any> {
    const isMember = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        members: {
          some: { userId: userId },
        },
      },
    });

    if (!isMember) {
      return { error: 'User is not a member of any company.' };
    }

    try {
      const companyMembers = await this.prisma.company.findMany({
        where: { id: companyId },
        select: {
          members: {
            select: {
              id: true,
              role: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  profile: { select: { firstName: true, lastName: true } },
                },
              },
            },
          },
        },
      });
      return { companyMembers };
    } catch (error) {
      if (error.code === 'P2002') {
        return { error: 'Company with this name already exists.' };
      }
      throw new Error('An unexpected error occurred.');
    }
  }
}
