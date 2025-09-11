import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/Database/prisma.service";
import { createInvitesRepository } from "../../companies/create-invite-repositories";
import { randomBytes } from 'crypto';

@Injectable()
export class PrismaInvitesCreateRepository implements createInvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async checkUserIsOwner(userId: string, companyId: string): Promise<boolean> {
    const member = await this.prisma.companyMember.findUnique({
      where: {
        userId_companyId: {
          userId,
          companyId,
        },
      },
    });

    return member?.role === 'OWNER';
  }

  async createInvite(companyId: string): Promise<{ code: string; expiresAt: Date }> {
    const code = randomBytes(8).toString('hex'); // gera código seguro
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // expira em 1 hora

    const invite = await this.prisma.invite.create({
      data: {
        code,
        companyId,
        expiresAt,
      },
    });

    return {
      code: invite.code,
      expiresAt: invite.expiresAt,
    };
  }
}
