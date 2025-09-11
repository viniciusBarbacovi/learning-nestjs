import { Body, Controller, Delete, Get, Post, Patch, Param, UseGuards, Request, Req, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { ForbiddenException } from '@nestjs/common';

import { createMemberBody } from './dtos/users/create-user-body';
import { updateMemberBody } from './dtos/users/update-user-body';

import { createUserRepositories } from './repositories/users/create-user-repositories';
import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { loginUserRepositories } from './repositories/users/login-user-repositories';

import { createCompaniesBody } from './dtos/companies/create-companies-body';
import { CreateInviteDto } from './dtos/companies/create-invites-body';
import { JoinInviteDto } from './dtos/companies/join-invites-body';
import { CreateProductDto } from './dtos/companies/create-product-body'
import { CreateCategoryBody } from './dtos/companies/create-category-body'

import { createCompaniesRepositories } from './repositories/companies/create-companies-repositories'
import { getCompaniesRepositories } from './repositories/companies/get-companies-repositories';
import { createInvitesRepository } from './repositories/companies/create-invite-repositories'
import { joinInviteCompaniesRepositories } from './repositories/companies/join-invite-repositories'
import { createProductRepositories } from './repositories/companies/create-product-repositories'
import { createCategoryRepository } from './repositories/companies/create-category-repositories'
import { CategoriesRepositories } from './repositories/companies/list-category-repositories'

import { use } from 'passport';
import { error } from 'console';

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
    private CreateInvitesRepositories: createInvitesRepository,
    private CreateProductRepositories: createProductRepositories,
    private CreateCategoryRepositories: createCategoryRepository,
    private ListCategoryRepositories: CategoriesRepositories,
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

  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/invites')
  async createInvite(@Param('companyId') companyId: string, @Req() req) {
    const userId = req.user.sub
    const isOwner = await this.CreateInvitesRepositories.checkUserIsOwner(userId, companyId);
    if (!isOwner) {
      throw new ForbiddenException('Apenas o proprietário da empresa pode criar convites.');
    }

    const invite = await this.CreateInvitesRepositories.createInvite(companyId);
    return {
      inviteCode: invite.code,
      expiresAt: invite.expiresAt,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/inventory')
  async addProduct(@Param('companyId') companyId: string, @Body() body: CreateProductDto, @Req() req: any,) {
    const userId = req.user.sub;
    const member = await this.CreateInvitesRepositories['prisma'].companyMember.findFirst({
      where: { userId, companyId },
    });
    if (!member || member.role !== 'OWNER') {
      throw new ForbiddenException('Apenas o proprietário pode adicionar produtos');
    }
    const product = await this.CreateProductRepositories.createProduct(companyId, body);
    return {
      message: 'Produto criado com sucesso',
      product,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/categories')
  async createCategory(@Param('companyId') companyId: string, @Body() body: CreateCategoryBody, @Req() req: any,) {
    const userId = req.user.sub;
    const isOwner = await this.CreateCategoryRepositories.checkUserIsOwner(userId, companyId);
    if (!isOwner) {
      throw new ForbiddenException('Apenas o proprietário da empresa pode criar categorias.');
    }
    const category = await this.CreateCategoryRepositories.create(companyId, body.name);
    return category;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/categories')
  async listCategories(@Param('companyId') companyId: string, @Req() req: any) {
    const userId = req.user.sub;
    return await this.ListCategoryRepositories.listByCompany(companyId, userId);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('/:companyId/categories')
  // async listCategories(@Param('companyId') companyId: string, @Req() req: any,) {
  //   const userId = req.user.sub;
  //   const membership = await this.prisma.companyMember.findUnique({
  //     where: { userId_companyId: { userId, companyId } },
  //   });
  //   if (!membership) {
  //     throw new ForbiddenException('Você não é membro desta empresa.');
  //   }
  //   return this.ListCategoryRepositories.list(companyId);
  // }

}

@Controller('api/invites')
export class InvitesController {
  constructor(
    private JoinInvitesRepositories: joinInviteCompaniesRepositories,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('join')
  async joinCompany(@Body() body: JoinInviteDto, @Req() req: any) {
    const userId = req.user.sub;
    const { inviteCode } = body;

    const invite = await this.JoinInvitesRepositories.findByCode(inviteCode);
    if (!invite) {
      throw new NotFoundException('Invalid invite code');
    }

    // 2. Checar expiração
    if (invite.expiresAt < new Date()) {
      throw new BadRequestException('Invite expired');
    }

    // 3. Verificar se o usuário já é membro
    const alreadyMember = await this.JoinInvitesRepositories['prisma'].companyMember.findFirst({
      where: { userId, companyId: invite.companyId },
    });

    if (alreadyMember) {
      throw new BadRequestException('User is already a member of this company');
    }

    // 4. Adicionar membro
    await this.JoinInvitesRepositories.addMember(userId, invite.companyId);

    // (Opcional) invalidar o convite se for de uso único
    // await this.inviteRepo.invalidateInvite(invite.id);

    // 5. Retornar resposta
    return {
      message: `Successfully joined company '${invite.company.name}'`,
      companyId: invite.company.id,
      companyName: invite.company.name,
    };
  }
}