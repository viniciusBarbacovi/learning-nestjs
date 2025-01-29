import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { createUserRepositories } from './repositories/users/create-user-repositories'
import { prismaUserRepositories } from './repositories/Prisma/users/prisma-user-create-repositories'
import { getUserRepositories } from './repositories/users/get-users-repositories'
import { prismaUserGetRepositories } from './repositories/Prisma/users/prisma-user-get-repositories'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, 
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: getUserRepositories, useClass: prismaUserGetRepositories},
    ],
})
export class AppModule {}
