import { Module } from '@nestjs/common';
import {
  AppController,
  CompaniesController,
  InvitesController,
  UsersController,
} from './app.controller';
import { PrismaService } from './Database/prisma.service';
import { JwtModule } from '@nestjs/jwt';

import { createUserRepositories } from './repositories/users/create-user-repositories';
import { prismaUserRepositories } from './repositories/Prisma/users/prisma-user-create-repositories';

import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { prismaUserUpdateRepositories } from './repositories/Prisma/users/prisma-user-update-repositories';

import { loginUserRepositories } from './repositories/users/login-user-repositories';
import { prismaLoginUserRepositories } from './repositories/Prisma/users/prisma-user-login-repositories';

import { createCompaniesRepositories } from './repositories/companies/companies/create-companies-repositories';
import { prismaCompaniesCreateRepositories } from './repositories/Prisma/companies/companies/prisma-companies-create-repositories';

import { getCompaniesByUserRepositories } from './repositories/companies/companies/get-companies-by-user-repositories';
import { prismaCompaniesGetByUserRepositories } from './repositories/Prisma/companies/companies/prisma-companies-get-by-user-repositories';

import { createInvitesRepository } from './repositories/companies/invites/create-invite-repositories';
import { PrismaInvitesCreateRepository } from './repositories/Prisma/companies/invites/prisma-invites-create-repositories';

import { joinInviteCompaniesRepositories } from './repositories/companies/invites/join-invite-repositories';
import { PrismaInvitesJoinRepository } from './repositories/Prisma/companies/invites/prisma-invites-join-repositories';

import { createProductRepositories } from './repositories/companies/products/create-product-repositories';
import { PrismaProductCreateRepository } from './repositories/Prisma/companies/products/prisma-product-create-repositories';

import { createCategoryRepository } from './repositories/companies/categories/create-category-repositories';
import { PrismaCategoriesCreateRepository } from './repositories/Prisma/companies/categories/prisma-category-create-repositories';

import { ListCategoriesRepositories } from './repositories/companies/categories/list-category-repositories';
import { PrismaCategoriesRepository } from './repositories/Prisma/companies/categories/prisma-category-list-repositories';

import { getUserRepositories } from './repositories/users/get-user-repositories';
import { PrismaGetUserRepository } from './repositories/Prisma/users/prisma-user-get-repositories';

import { deleteUserRepositories } from './repositories/users/delete-user-repositories';
import { PrismadeleteUserRepository } from './repositories/Prisma/users/prisma-user-delete-repositories';

import { getCompaniesMembersRepositories } from './repositories/companies/companies/get-members-by-companies-repositories';
import { prismaCompaniesGetMembersRepositories } from './repositories/Prisma/companies/companies/prisma-companies-get-members-repositories';

import { updateCargoUserRepositories } from './repositories/companies/companies/update-cargo-company-repositories';
import { prismaCompaniesUpdateCargoRepositories } from './repositories/Prisma/companies/companies/prisma-companies-update-cargo-repositories';

import { listUniqueCategoriesRepositories } from './repositories/companies/categories/list-unique-category-repositories';
import { PrismaListUniqueCategoriesRepository } from './repositories/Prisma/companies/categories/prisma-category-list-unique-repositories';

import { updateCategoriesRepositories } from './repositories/companies/categories/update-category-repositories';
import { PrismaCaterogyUpdateRepository } from './repositories/Prisma/companies/categories/prisma-category-update-repositories';

import { deleteCategoriesRepositories } from './repositories/companies/categories/delete-category-respositories';
import { PrismaCaterogyDeleteRepository } from './repositories/Prisma/companies/categories/prisma-category-delete-repositories';

import { listInvitesRepository } from './repositories/companies/invites/list-invite-repositories';
import { PrismaInvitesListRepository } from './repositories/Prisma/companies/invites/prisma-invites-list-repositories';

import { deleteInvitesRepository } from './repositories/companies/invites/delete-invite-repositories';
import { PrismaInvitesDeleteRepository } from './repositories/Prisma/companies/invites/prisma-invites-delete-repositories';

import { listProductRepositories } from './repositories/companies/products/list-product-repositories';
import { PrismaProductListRepository } from './repositories/Prisma/companies/products/prisma-product-list-repositories';

import { updateProductRepositories } from './repositories/companies/products/update-product-repositories';
import { PrismaProductUpdateRepository } from './repositories/Prisma/companies/products/prisma-product-update-repositories';

import { deleteProductRepositories } from './repositories/companies/products/delete-product-repositories';
import { PrismaProductDeleteRepository } from './repositories/Prisma/companies/products/prisma-product-delete-repositories';

import { JwtStrategy } from './auth/jwt.strategy';
//import {  } from './repositories/'

@Module({
  imports: [
    JwtModule.register({
      secret: 'minha_chave_secreta',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AppController,
    CompaniesController,
    InvitesController,
    UsersController,
  ],
  providers: [
    PrismaService,
    JwtStrategy,
    { provide: createUserRepositories, useClass: prismaUserRepositories },
    { provide: updateUserRepositories, useClass: prismaUserUpdateRepositories },
    { provide: loginUserRepositories, useClass: prismaLoginUserRepositories },
    {
      provide: createCompaniesRepositories,
      useClass: prismaCompaniesCreateRepositories,
    },
    {
      provide: getCompaniesByUserRepositories,
      useClass: prismaCompaniesGetByUserRepositories,
    },
    {
      provide: createInvitesRepository,
      useClass: PrismaInvitesCreateRepository,
    },
    {
      provide: joinInviteCompaniesRepositories,
      useClass: PrismaInvitesJoinRepository,
    },
    {
      provide: createProductRepositories,
      useClass: PrismaProductCreateRepository,
    },
    {
      provide: createCategoryRepository,
      useClass: PrismaCategoriesCreateRepository,
    },
    {
      provide: ListCategoriesRepositories,
      useClass: PrismaCategoriesRepository,
    },
    { provide: getUserRepositories, useClass: PrismaGetUserRepository },
    { provide: deleteUserRepositories, useClass: PrismadeleteUserRepository },
    {
      provide: getCompaniesMembersRepositories,
      useClass: prismaCompaniesGetMembersRepositories,
    },
    {
      provide: updateCargoUserRepositories,
      useClass: prismaCompaniesUpdateCargoRepositories,
    },
    {
      provide: listUniqueCategoriesRepositories,
      useClass: PrismaListUniqueCategoriesRepository,
    },
    {
      provide: updateCategoriesRepositories,
      useClass: PrismaCaterogyUpdateRepository,
    },
    {
      provide: deleteCategoriesRepositories,
      useClass: PrismaCaterogyDeleteRepository,
    },
    { provide: listInvitesRepository, useClass: PrismaInvitesListRepository },
    {
      provide: deleteInvitesRepository,
      useClass: PrismaInvitesDeleteRepository,
    },
    { provide: listProductRepositories, useClass: PrismaProductListRepository },
    {
      provide: updateProductRepositories,
      useClass: PrismaProductUpdateRepository,
    },
    {
      provide: deleteProductRepositories,
      useClass: PrismaProductDeleteRepository,
    },
  ],
})
export class AppModule {}
