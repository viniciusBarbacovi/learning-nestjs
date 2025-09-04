import { Module } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';

import { createUserRepositories } from './repositories/users/create-user-repositories'
import { prismaUserRepositories } from './repositories/Prisma/users/prisma-user-create-repositories'

import { getUserRepositories } from './repositories/users/get-users-repositories'
import { prismaUserGetRepositories } from './repositories/Prisma/users/prisma-user-get-repositories'

import { deleteUserRepositories } from './repositories/users/delete-user-repositories'
import { prismaUserDeleteRepositories } from './repositories/Prisma/users/prisma-user-delete-repositories'

import { updateUserRepositories } from './repositories/users/update-user-repositories'
import { prismaUserUpdateRepositories } from './repositories/Prisma/users/prisma-user-update-repositories'

import { findUniqueUserRepositories } from './repositories/users/findunique-user-repositories'
import { prismaFindUniqueUserRepositories } from './repositories/Prisma/users/prisma-user-findunique-repositories'
//import {  } from './repositories/'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService, 
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: getUserRepositories, useClass: prismaUserGetRepositories},
    {provide: deleteUserRepositories, useClass: prismaUserDeleteRepositories},
    {provide: updateUserRepositories, useClass: prismaUserUpdateRepositories},
    {provide: findUniqueUserRepositories, useClass: prismaFindUniqueUserRepositories}
    ],
})
export class AppModule {}
