import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/Database/prisma.service';
import { getUserRepositories } from '../../users/get-user-repositories';

@Injectable()
export class PrismaGetUserRepository implements getUserRepositories {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(userId: string): Promise<any> {
    const userExist = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExist) throw new ForbiddenException('User does not exist');

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        profile: { select: { firstName: true, lastName: true } },
        createdAt: true,
      },
    });

    return user;
  }
}
