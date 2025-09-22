import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { joinInviteCompaniesRepositories } from '../../../companies/invites/join-invite-repositories';

@Injectable()
export class PrismaInvitesJoinRepository
  implements joinInviteCompaniesRepositories
{
  constructor(private readonly prisma: PrismaService) {}

  async joinInvite(
    userId: string,
    inviteCode: string,
  ): Promise<{ message: string; companyId: string; companyName: string }> {
    const invite = await this.prisma.invite.findUnique({
      where: { code: inviteCode },
      include: { company: true },
    });

    if (!invite) {
      throw new BadRequestException('Convite inválido ou expirado.');
    }

    const alreadyMember = await this.prisma.companyMember.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId: invite.companyId,
        },
      },
    });

    if (alreadyMember) {
      throw new BadRequestException('Você já faz parte desta empresa.');
    }

    await this.prisma.companyMember.create({
      data: {
        userId,
        companyId: invite.companyId,
        role: 'EMPLOYEE',
      },
    });

    return {
      message: `Successfully joined company '${invite.company.name}'`,
      companyId: invite.company.id,
      companyName: invite.company.name,
    };
  }
}
