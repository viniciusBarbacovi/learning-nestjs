import {
  Injectable,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { listInvitesRepository } from '../../../companies/invites/list-invite-repositories';
import { randomBytes } from 'crypto';
import { add } from 'date-fns';

@Injectable()
export class PrismaInvitesListRepository implements listInvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async listInvite(userId: string, companyId: string): Promise<any> {
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
        'Apenas o dono da empresa pode litar os convites.',
      );
    }

    // Tenta criar o convite com o código gerado
    const invite = await this.prisma.invite.findMany({
      where: { companyId },
    });
    return invite;
  }
}
