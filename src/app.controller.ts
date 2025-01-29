import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { randomUUID } from 'crypto';
import { createMemberBody } from './dtos/create-user-body';
import { createUserRepositories } from './repositories/users/create-user-repositories';
import { getUserRepositories } from './repositories/users/get-users-repositories'

@Controller()       //prefixo para todas as rotas, se colocasse @Controller('app') essa rota seria http://localhost:3000/app/hello
export class AppController {
  constructor(
    private CreateUserRepositories: createUserRepositories,
    private GetUserRepositories: getUserRepositories
  ) { }

  @Post('create')     //rota  http://localhost:3000/create
  async createUser(@Body() body: createMemberBody) {
    const { name, description } = body;

    return await this.CreateUserRepositories.create(name, description)

  }

  @Get('get')
  async getUsers(){
    return await this.GetUserRepositories.findMany()
  }

}
