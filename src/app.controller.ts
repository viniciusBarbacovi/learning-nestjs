import { Body, Controller, Delete, Get, Post, Patch, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { randomUUID } from 'crypto';

import { createMemberBody } from './dtos/create-user-body';
import { deleteMemberBody } from './dtos/delete-user-body';
import { updateMemberBody } from './dtos/update-user-body';

import { createUserRepositories } from './repositories/users/create-user-repositories';
import { getUserRepositories } from './repositories/users/get-users-repositories';
import { deleteUserRepositories } from './repositories/users/delete-user-repositories';
import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { findUniqueUserRepositories } from './repositories/users/findunique-user-repositories';

import { createStudentBody } from './dtos/create-student-body';
import { updateStudentBody } from './dtos/update-student-body';

import { createStudentRepositories } from './repositories/students/create-student-repositories'
import { getStudentsRepositories } from './repositories/students/get-students-repositories'
import { deleteStudentRepositories } from './repositories/students/delete-student-repositories'
import { updateStudentRepositories } from './repositories/students/update-student-repositories'
//import {  } from './repositories/'

@Controller('user')       //prefixo para todas as rotas, se colocasse @Controller('app') essa rota seria http://localhost:3000/app/hello
export class AppController {
  constructor(
    private CreateUserRepositories: createUserRepositories,
    private GetUserRepositories: getUserRepositories,
    private DeleteUserRepositories : deleteUserRepositories,
    private UpdateUserRepositories : updateUserRepositories,
    private FindUniqueUserRepositories : findUniqueUserRepositories
  ) { }

  @Post()     //rota  http://localhost:3000/
  async createUser(@Body() CreateMemberBody: createMemberBody) {
    return await this.CreateUserRepositories.create(CreateMemberBody.name, CreateMemberBody.email )
  }

  @Get()
  async getUsers(){
    return await this.GetUserRepositories.findMany()
  }

  @Delete(':id')
  async deleteUsers(@Param('id') id:string){
    return await this.DeleteUserRepositories.delete(id)
  }

  @Patch(':id')
  async updateUser(@Param('id') id:string, @Body() UpdateMemberBody: updateMemberBody){
    return await this.UpdateUserRepositories.update(id, UpdateMemberBody.name, UpdateMemberBody.email)
  }

  @Get(':id')
  async getUniqueUser(@Param('id') id:string){
    return await this.FindUniqueUserRepositories.findUnique(id)
  }

}

@Controller('student')
export class studentController{
  constructor(
    private CreateStudentRepositories: createStudentRepositories,
    private GetStudentsRepositories: getStudentsRepositories,
    private DeleteStudentRepositories: deleteStudentRepositories,
    private UpdateStudentRepositories: updateStudentRepositories,
  ) {  }

  @Post(':id')
  async createStudent(@Param('id') student_id:string, @Body() CreateStudentBody: createStudentBody) {
    return await this.CreateStudentRepositories.create(student_id, CreateStudentBody.class_id)
  }

  @Get()
  async getStudents(){
    return await this.GetStudentsRepositories.findMany()
  }

  @Delete(':id')
  async deleteStudent(@Param('id') id:string){
    return await this.DeleteStudentRepositories.delete(id)
  }

  @Patch(':id')
  async updateStudent(@Param('id') id:string, @Body() UpdateStudentBody: updateStudentBody){
    return await this.UpdateStudentRepositories.update(id, UpdateStudentBody.class_id, UpdateStudentBody.student_id)
  }

}