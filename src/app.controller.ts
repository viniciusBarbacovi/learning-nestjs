import { Body, Controller, Delete, Get, Post, Patch, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { randomUUID } from 'crypto';

import { createMemberBody } from './dtos/create-user-body';
import { updateMemberBody } from './dtos/update-user-body';

import { createUserRepositories } from './repositories/users/create-user-repositories';
import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { loginUserRepositories } from './repositories/users/login-user-repositories';
import { JwtService } from '@nestjs/jwt';
//import {  } from './repositories/'

@Controller('api/auth/')       //prefixo para todas as rotas, se colocasse @Controller('app') essa rota seria http://localhost:3000/app/hello
export class AppController {
  constructor(
    private CreateUserRepositories: createUserRepositories,
    private UpdateUserRepositories : updateUserRepositories,
    private LoginUserRepositories: loginUserRepositories,
    private jwtService: JwtService,
  ) { }

  @Post('register')     //rota  http://localhost:3000/
  async createUser(@Body() CreateMemberBody: createMemberBody) {
    return await this.CreateUserRepositories.create(CreateMemberBody.firstName,CreateMemberBody.lastName, CreateMemberBody.email,  CreateMemberBody.password)
  }

  @Patch('update/:id')
  async updateUser(@Param('id') id:string, @Body() UpdateMemberBody: updateMemberBody){
    return await this.UpdateUserRepositories.update(id, UpdateMemberBody.email ?? "", UpdateMemberBody.firstName ?? "", UpdateMemberBody.lastName ?? "", UpdateMemberBody.password ?? "")
  }

  @Post("login")
    async login(@Body() body: { email: string; password: string }) {
      const user = await this.LoginUserRepositories.login(body.email, body.password);

      const payload = { sub: user.id, email: user.email };
      const accessToken = this.jwtService.sign(payload, {
        secret: "SUA_CHAVE_SECRETA",
        expiresIn: "1h",
      });return { accessToken, user };
    }
}
