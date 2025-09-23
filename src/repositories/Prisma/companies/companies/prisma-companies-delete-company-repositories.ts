import { deleteCompanyRepository } from '../../../companies/companies/delete-company-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class prismaCompaniesDeleteCompanyRepositories
  implements deleteCompanyRepository
{
  constructor(private prisma: PrismaService) {}

  async deleteCompany(userId: string, companyId: string): Promise<any> {
    const company = await this.prisma.companyMember.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });

    if (!company) {
      throw new NotFoundException(
        `Empresa com ID ${companyId} não encontrada.`,
      );
    }

    if (company.role !== 'OWNER') {
      throw new ForbiddenException(
        'Apenas o proprietário OWNER pode excluir a empresa.',
      );
    }

    const deleteMember = await this.prisma.company.delete({
      where: { id: companyId },
    });

    return deleteMember;
  }
}
