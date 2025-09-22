import {
  Injectable,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { createInvitesRepository } from '../../../companies/invites/create-invite-repositories';
import { randomBytes } from 'crypto';
import { add } from 'date-fns';

@Injectable()
export class PrismaInvitesCreateRepository implements createInvitesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createInvite(userId: string, companyId: string): Promise<any> {
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
        'Apenas o dono da empresa pode criar convites.',
      );
    }

    const expiresAt = add(new Date(), { days: 1 });

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
      // Gera um novo código a cada tentativa
      const code = randomBytes(6)
        .toString('hex')
        .toUpperCase()
        .match(/.{1,4}/g)!
        .join('-');

      try {
        // Tenta criar o convite com o código gerado
        const invite = await this.prisma.invite.create({
          data: {
            code,
            expiresAt,
            companyId,
          },
        });
        // Se for bem-sucedido, retorna o convite e sai da função.
        return invite;
      } catch (error) {
        // Verifica se o erro é de violação de chave única do Prisma
        if (error.code === 'P2002') {
          // P2002 = Unique constraint failed.
          // O código já existe, o loop vai continuar para tentar outro.
          attempts++;
        } else {
          // Se for qualquer outro erro, lança-o imediatamente.
          throw error;
        }
      }
    }

    // 4. Failsafe: se o loop terminar sem sucesso, algo está muito errado.
    throw new InternalServerErrorException(
      'Não foi possível gerar um código de convite único após várias tentativas.',
    );
  }
}
