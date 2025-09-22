import { updateCargoUserRepositories } from '../../../companies/companies/update-cargo-company-repositories';
import { PrismaService } from 'src/Database/prisma.service';
import { randomUUID } from 'crypto';
import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';

@Injectable()
export class prismaCompaniesUpdateCargoRepositories
  implements updateCargoUserRepositories
{
  constructor(private prisma: PrismaService) {}

  async updateCargoUser(
    userId: string,
    companyId: string,
    memberId: string,
    role: Role,
  ): Promise<any> {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: { members: true },
    });
    if (!company) throw new NotFoundException('Company not found');

    const requestingMember = company.members.find(
      (member) => member.userId === userId,
    );
    if (!requestingMember) {
      throw new ForbiddenException('You are not a member of this company');
    }

    const isOwner = requestingMember.role === Role.OWNER;
    if (!isOwner) {
      throw new ForbiddenException(
        'Only the OWNER can update roles of other members',
      );
    }

    try {
      const updateMember = await this.prisma.companyMember.update({
        where: { id: memberId },
        data: { role },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
          company: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return updateMember;
    } catch (error) {
      console.error(error);

      if (error.code === 'P2002') {
        throw new ForbiddenException('Unique constraint failed.');
      }

      if (error.code === 'P2025') {
        throw new NotFoundException('Member not found.');
      }

      throw new Error(`Unexpected error: ${error.message}`);
    }
  }
}
