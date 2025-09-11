import { Module } from '@nestjs/common';
import { AppController, CompaniesController} from './app.controller';
import { PrismaService } from './Database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

import { createUserRepositories } from './repositories/users/create-user-repositories'
import { prismaUserRepositories } from './repositories/Prisma/users/prisma-user-create-repositories'

import { updateUserRepositories } from './repositories/users/update-user-repositories'
import { prismaUserUpdateRepositories } from './repositories/Prisma/users/prisma-user-update-repositories'

import { loginUserRepositories } from './repositories/users/login-user-repositories'
import { prismaLoginUserRepositories } from './repositories/Prisma/users/prisma-user-login-repositories'

import { createCompaniesRepositories } from './repositories/companies/create-companies-repositories'
import { prismaCompaniesCreateRepositories } from './repositories/Prisma/companies/prisma-companies-create-repositories'

import { getCompaniesRepositories } from './repositories/companies/get-companies-repositories'
import { prismaCompaniesGetRepositories } from './repositories/Prisma/companies/prisma-companies-get-repositories'

import { createInvitesRepository } from './repositories/invites/create-invite-repositories'
import { PrismaInvitesCreateRepository } from './repositories/Prisma/invites/prisma-invites-create-repositories'

import { JwtStrategy } from './auth/jwt.strategy';
//import {  } from './repositories/'

@Module({
  imports: [JwtModule.register({secret: 'minha_chave_secreta',signOptions: { expiresIn: '1h' },}), ],
  controllers: [AppController, CompaniesController],
  providers: [PrismaService, JwtStrategy,
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: updateUserRepositories, useClass: prismaUserUpdateRepositories},
    {provide: loginUserRepositories, useClass: prismaLoginUserRepositories},
    {provide: createCompaniesRepositories, useClass: prismaCompaniesCreateRepositories},
    {provide: getCompaniesRepositories, useClass: prismaCompaniesGetRepositories},
    {provide: createInvitesRepository, useClass: PrismaInvitesCreateRepository}
    ],
})
export class AppModule {}
