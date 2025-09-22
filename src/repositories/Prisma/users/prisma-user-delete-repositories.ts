import {
  Injectable,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { deleteUserRepositories } from '../../users/delete-user-repositories';

@Injectable()
export class PrismadeleteUserRepository implements deleteUserRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async deleteUser(userId: string): Promise<any> {
    const userExist = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExist) throw new ForbiddenException('User does not exist');

    const memberships = await this.prisma.companyMember.findMany({
      where: { userId },
    });
    if (memberships.length > 0) {
      throw new ForbiddenException(
        'User still belongs to companies — remove memberships first.',
      );
    }

    try {
      await this.prisma.$transaction([
        this.prisma.profile.deleteMany({ where: { userId } }),
        this.prisma.user.delete({ where: { id: userId } }),
      ]);
    } catch (err) {
      throw new InternalServerErrorException(
        'Error deleting user: ' + err.message,
      );
    }
  }
}
