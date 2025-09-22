import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { deleteInvitesRepository } from '../../../companies/invites/delete-invite-repositories';

@Injectable()
export class PrismaInvitesDeleteRepository implements deleteInvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async deleteInvite(
    userId: string,
    companyId: string,
    inviteId: string,
  ): Promise<any> {
    const company = await this.prisma.company.findFirst({
      where: {
        id: companyId,
        members: {
          some: {
            userId: userId,
            role: 'OWNER',
          },
        },
      },
    });

    if (!company) {
      throw new ForbiddenException(
        'Apenas o dono da empresa pode apagar um convite.',
      );
    }

    // Tenta criar o convite com o código gerado
    const invite = await this.prisma.invite.delete({
      where: { id: inviteId },
    });
    return invite;
  }
}
