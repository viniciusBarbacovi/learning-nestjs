import { Role } from '@prisma/client';

export abstract class updateCargoUserRepositories {
  abstract updateCargoUser(
    userId: string,
    companyId: string,
    memberId: string,
    role: Role,
  ): Promise<any>;
}
