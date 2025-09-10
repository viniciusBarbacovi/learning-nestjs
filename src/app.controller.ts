import { Body, Controller, Delete, Get, Post, Patch, Param, UseGuards, Request, Req } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

import { createMemberBody } from './dtos/users/create-user-body';
import { updateMemberBody } from './dtos/users/update-user-body';

import { createUserRepositories } from './repositories/users/create-user-repositories';
import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { loginUserRepositories } from './repositories/users/login-user-repositories';

import { createCompaniesBody } from './dtos/companies/create-companies-body';

import { createCompaniesRepositories } from './repositories/companies/create-companies-repositories'
import { getCompaniesRepositories } from './repositories/companies/get-companies-repositories';

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
        secret: "minha_chave_secreta",
        expiresIn: "1h",
      });return { accessToken, user };
    }
}

@Controller('api/companies')
export class CompaniesController {
  constructor(
    private CreateCompaniesRepositories: createCompaniesRepositories,
    private GetUserCompaniesRepositories: getCompaniesRepositories,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()     //rota  http://localhost:3000/
  async createCompanies(@Body() CreateCompaniesBody: createCompaniesBody, @Req() req:any) {
    const userId = req.user.sub
    return await this.CreateCompaniesRepositories.create(CreateCompaniesBody.name, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCompanies(@Req() req :any) {
    const userId = req.user.sub
    return await this.GetUserCompaniesRepositories.get(userId);
  }

}