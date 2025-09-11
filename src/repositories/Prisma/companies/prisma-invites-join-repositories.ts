import { Injectable } from '@nestjs/common';
import { PrismaService } from "src/Database/prisma.service";
import { joinInviteCompaniesRepositories } from "../../companies/join-invite-repositories";
import { randomBytes } from 'crypto';

@Injectable()
export class PrismaInvitesJoinRepository implements joinInviteCompaniesRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async findByCode(code: string) {
    return this.prisma.invite.findUnique({
      where: { code },
      include: { company: true },
    });
  }

  async createInvite(companyId: string): Promise<{ code: string; expiresAt: Date }> {
	const code = randomBytes(8).toString('hex');
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

  async addMember(userId: string, companyId: string) {
    return this.prisma.companyMember.create({
      data: {
        userId,
        companyId,
        role: 'EMPLOYEE', // 🔹 sempre entra como funcionário
      },
    });
  }

}
