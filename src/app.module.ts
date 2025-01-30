import { Module } from '@nestjs/common';
import { AppController, studentController } from './app.controller';
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

import { createStudentRepositories } from './repositories/students/create-student-repositories'
import { prismaStudentRepositories } from './repositories/Prisma/students/prisma-student-create-repositories'

import { getStudentsRepositories } from './repositories/students/get-students-repositories'
import { prismaStudentsGetRepositories } from './repositories/Prisma/students/prisma-students-get-repositories'

import { deleteStudentRepositories } from './repositories/students/delete-student-repositories'
import { prismaStudentDeleteRepositories } from './repositories/Prisma/students/prisma-student-delete-repositories'

import { updateStudentRepositories } from './repositories/students/update-student-repositories'
import { prismaStudentUpdateRepositories } from './repositories/Prisma/students/prisma-student-update-repositories'
//import {  } from './repositories/'

@Module({
  imports: [],
  controllers: [AppController, studentController],
  providers: [PrismaService, 
    {provide: createUserRepositories, useClass: prismaUserRepositories},
    {provide: getUserRepositories, useClass: prismaUserGetRepositories},
    {provide: deleteUserRepositories, useClass: prismaUserDeleteRepositories},
    {provide: updateUserRepositories, useClass: prismaUserUpdateRepositories},
    {provide: findUniqueUserRepositories, useClass: prismaFindUniqueUserRepositories},
    {provide: createStudentRepositories, useClass: prismaStudentRepositories},
    {provide: getStudentsRepositories, useClass: prismaStudentsGetRepositories},
    {provide: deleteStudentRepositories, useClass: prismaStudentDeleteRepositories},
    {provide: updateStudentRepositories, useClass: prismaStudentUpdateRepositories}
    ],
})
export class AppModule {}
