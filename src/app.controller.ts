import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './Database/prisma.service';
import { randomUUID } from 'crypto';
import { createMemberBody } from './dtos/create-user-body';
import { createUserRepositories } from './repositories/user-repositories';

@Controller()       //prefixo para todas as rotas, se colocasse @Controller('app') essa rota seria http://localhost:3000/app/hello
export class AppController {
  constructor(
    private CreateUserRepositories: createUserRepositories
  ) { }

  @Post('Hello')     //rota  http://localhost:3000/hello
  async getHello(@Body() body: createMemberBody) {
    const { name, description } = body;

    await this.CreateUserRepositories.create(name, description)

  }
}
