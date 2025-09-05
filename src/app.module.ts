import { Module } from '@nestjs/common';
import { AppController} from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

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

import { loginUserRepositories } from './repositories/users/login-user-repositories'
import { prismaLoginUserRepositories } from './repositories/Prisma/users/prisma-user-login-repositories'
//import {  } from './repositories/'

@Module({
  imports: [JwtModule.register({secret: 'SUA_CHAVE_SECRETA',signOptions: { expiresIn: '1h' },})],
  controllers: [AppController],
  providers: [PrismaService, 
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: getUserRepositories, useClass: prismaUserGetRepositories},
    {provide: deleteUserRepositories, useClass: prismaUserDeleteRepositories},
    {provide: updateUserRepositories, useClass: prismaUserUpdateRepositories},
    {provide: findUniqueUserRepositories, useClass: prismaFindUniqueUserRepositories},
    {provide: loginUserRepositories, useClass: prismaLoginUserRepositories}
    ],
})
export class AppModule {}
