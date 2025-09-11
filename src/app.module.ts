import { Module } from '@nestjs/common';
import { AppController, CompaniesController, InvitesController} from './app.controller';
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

import { createInvitesRepository } from './repositories/companies/create-invite-repositories'
import { PrismaInvitesCreateRepository } from './repositories/Prisma/companies/prisma-invites-create-repositories'

import { joinInviteCompaniesRepositories } from './repositories/companies/join-invite-repositories'
import { PrismaInvitesJoinRepository } from './repositories/Prisma/companies/prisma-invites-join-repositories'

import { createProductRepositories } from './repositories/companies/create-product-repositories'
import { PrismaInventoryRepositories } from './repositories/Prisma/companies/prisma-product-create-repositories'

import { createCategoryRepository } from './repositories/companies/create-category-repositories'
import { PrismaCategoriesCreateRepository } from './repositories/Prisma/companies/prisma-category-create-repositories'

import { CategoriesRepositories } from './repositories/companies/list-category-repositories'
import { PrismaCategoriesRepository } from './repositories/Prisma/companies/prisma-category-list-repositories'

import { JwtStrategy } from './auth/jwt.strategy';
//import {  } from './repositories/'

@Module({
  imports: [JwtModule.register({secret: 'minha_chave_secreta',signOptions: { expiresIn: '1h' },}), ],
  controllers: [AppController, CompaniesController, InvitesController],
  providers: [PrismaService, JwtStrategy,
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: updateUserRepositories, useClass: prismaUserUpdateRepositories},
    {provide: loginUserRepositories, useClass: prismaLoginUserRepositories},
    {provide: createCompaniesRepositories, useClass: prismaCompaniesCreateRepositories},
    {provide: getCompaniesRepositories, useClass: prismaCompaniesGetRepositories},
    {provide: createInvitesRepository, useClass: PrismaInvitesCreateRepository},
    {provide: joinInviteCompaniesRepositories, useClass: PrismaInvitesJoinRepository},
    {provide: createProductRepositories, useClass: PrismaInventoryRepositories},
    {provide: createCategoryRepository, useClass: PrismaCategoriesCreateRepository},
    {provide: CategoriesRepositories, useClass: PrismaCategoriesRepository},
    ],
})
export class AppModule {}
