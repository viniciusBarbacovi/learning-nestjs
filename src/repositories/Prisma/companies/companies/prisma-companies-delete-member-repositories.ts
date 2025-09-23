import { deleteMemberCompaniesRepositories } from '../../../companies/companies/delete-member-companies-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import { randomUUID } from 'crypto';
import { Injectable, ForbiddenException } from '@nestjs/common';

@Injectable()
export class prismaCompaniesDeleteMemberRepositories
  implements deleteMemberCompaniesRepositories
{
  constructor(private prisma: PrismaService) {}

  async deleteMember(
    userId: string,
    companyId: string,
    memberId: string,
  ): Promise<any> {
    const ownerCompany = await this.prisma.company.findFirst({
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

    if (!ownerCompany) {
      throw new ForbiddenException(
        'Apenas o dono da empresa pode adicionar produtos.',
      );
    }

    const deleteMember = await this.prisma.companyMember.delete({
      where: { id: memberId },
    });

    return deleteMember;
  }
}
