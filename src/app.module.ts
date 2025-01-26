import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { createUserRepositories } from './repositories/user-repositories'
import { prismaUserRepositories } from './repositories/Prisma/prisma-user-repositories'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, {provide: createUserRepositories, useClass: prismaUserRepositories,}],
})
export class AppModule {}
