import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ForbiddenException } from '@nestjs/common';

// DTOs users
import { createMemberBody } from './dtos/users/create-user-body';
import { updateMemberBody } from './dtos/users/update-user-body';

// Users
import { createUserRepositories } from './repositories/users/create-user-repositories';
import { updateUserRepositories } from './repositories/users/update-user-repositories';
import { loginUserRepositories } from './repositories/users/login-user-repositories';
import { getUserRepositories } from './repositories/users/get-user-repositories';
import { deleteUserRepositories } from './repositories/users/delete-user-repositories';

// DTOs companies
import { createCompaniesBody } from './dtos/companies/companies/create-companies-body';
import { JoinInviteDto } from './dtos/companies/invites/join-invites-body';
import { CreateProductDto } from './dtos/companies/products/create-product-body';
import { CreateCategoryBody } from './dtos/companies/categories/create-category-body';
import { UpdateCategoryBody } from './dtos/companies/categories/update-category-body';
import { UpdateCargoUserDto } from './dtos/companies/companies/update-cargo-campany-body';
import { UpdateProductDto } from './dtos/companies/products/update-product-body';

// Companies
import { createCompaniesRepositories } from './repositories/companies/companies/create-companies-repositories';
import { getCompaniesByUserRepositories } from './repositories/companies/companies/get-companies-by-user-repositories';
import { getCompaniesMembersRepositories } from './repositories/companies/companies/get-members-by-companies-repositories';
import { updateCargoUserRepositories } from './repositories/companies/companies/update-cargo-company-repositories';
import { deleteMemberCompaniesRepositories } from './repositories/companies/companies/delete-member-companies-repositories';
import { deleteCompanyRepository } from './repositories/companies/companies/delete-company-repositories';

// Categories
import { listUniqueCategoriesRepositories } from './repositories/companies/categories/list-unique-category-repositories';
import { ListCategoriesRepositories } from './repositories/companies/categories/list-category-repositories';
import { createCategoryRepository } from './repositories/companies/categories/create-category-repositories';
import { updateCategoriesRepositories } from './repositories/companies/categories/update-category-repositories';
import { deleteCategoriesRepositories } from './repositories/companies/categories/delete-category-respositories';

// Invites
import { createInvitesRepository } from './repositories/companies/invites/create-invite-repositories';
import { joinInviteCompaniesRepositories } from './repositories/companies/invites/join-invite-repositories';
import { listInvitesRepository } from './repositories/companies/invites/list-invite-repositories';
import { deleteInvitesRepository } from './repositories/companies/invites/delete-invite-repositories';

// Products
import { createProductRepositories } from './repositories/companies/products/create-product-repositories';
import { listProductRepositories } from './repositories/companies/products/list-product-repositories';
import { updateProductRepositories } from './repositories/companies/products/update-product-repositories';
import { deleteProductRepositories } from './repositories/companies/products/delete-product-repositories';

//import {  } from './repositories/'

@Controller('api/auth/') //prefixo para todas as rotas, se colocasse @Controller('app') essa rota seria http://localhost:3000/app/hello
export class AppController {
  constructor(
    private CreateUserRepositories: createUserRepositories,
    private LoginUserRepositories: loginUserRepositories,
    private jwtService: JwtService,
  ) {}

  // registra usuário
  @Post('register') //rota  http://localhost:3000/
  async createUser(@Body() CreateMemberBody: createMemberBody) {
    return await this.CreateUserRepositories.create(
      CreateMemberBody.firstName,
      CreateMemberBody.lastName,
      CreateMemberBody.email,
      CreateMemberBody.password,
    );
  }

  // faz login de usuário
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.LoginUserRepositories.login(
      body.email,
      body.password,
    );
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'minha_chave_secreta',
      expiresIn: '1h',
    });
    return { accessToken, user };
  }
}

@Controller('api/users')
export class UsersController {
  constructor(
    private UpdateUserRepositories: updateUserRepositories,
    private GetUserRepositories: getUserRepositories,
    private DeleteUserRepositories: deleteUserRepositories,
  ) {}

  // atualiza usuário
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateUser(
    @Req() req: any,
    @Body() UpdateMemberBody: updateMemberBody,
  ) {
    const userId = req.user.sub;
    return await this.UpdateUserRepositories.update(
      userId,
      UpdateMemberBody.email ?? '',
      UpdateMemberBody.firstName ?? '',
      UpdateMemberBody.lastName ?? '',
      UpdateMemberBody.password ?? '',
    );
  }

  // visualiza usuário
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Req() req: any) {
    const userId = req.user.sub;
    return await this.GetUserRepositories.getUser(userId);
  }

  // deleta o próprio usuário
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteUser(@Req() req: any) {
    const userId = req.user.sub;
    return await this.DeleteUserRepositories.deleteUser(userId);
  }
}

@Controller('api/companies')
export class CompaniesController {
  constructor(
    private CreateCompaniesRepositories: createCompaniesRepositories,
    private GetUserCompaniesByUserRepositories: getCompaniesByUserRepositories,
    private CreateInvitesRepositories: createInvitesRepository,
    private CreateProductRepositories: createProductRepositories,
    private CreateCategoryRepositories: createCategoryRepository,
    private ListCategoryRepositories: ListCategoriesRepositories,
    private GetUserCompaniesRepositories: getCompaniesMembersRepositories,
    private UpdateCargoUserRepositories: updateCargoUserRepositories,
    private ListUniqueCategoryRepositories: listUniqueCategoriesRepositories,
    private UpdateCategoryRepositories: updateCategoriesRepositories,
    private DeleteCategoryRepositories: deleteCategoriesRepositories,
    private ListInvitesRepositories: listInvitesRepository,
    private DeleteInvitesRepositories: deleteInvitesRepository,
    private ListProductRepositories: listProductRepositories,
    private UpdateProductRepositories: updateProductRepositories,
    private DeleteProductRepositories: deleteProductRepositories,
    private DeleteMemberCompaniesRepositories: deleteMemberCompaniesRepositories,
    private DeleteCompanyRepository: deleteCompanyRepository,
  ) {}

  // Companies routes

  //Cria companies
  @UseGuards(JwtAuthGuard)
  @Post() //rota  http://localhost:3000/
  async createCompanies(
    @Body() CreateCompaniesBody: createCompaniesBody,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.CreateCompaniesRepositories.create(
      CreateCompaniesBody.name,
      userId,
    );
  }

  //Atualiza cargo do usuário na company
  @UseGuards(JwtAuthGuard)
  @Patch('/:companyId/members/:memberId')
  async updateCargoCompanyUser(
    @Param('companyId') companyId: string,
    @Param('memberId') memberId: string,
    @Body() UpdateCargoUserBody: UpdateCargoUserDto,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.UpdateCargoUserRepositories.updateCargoUser(
      userId,
      companyId,
      memberId,
      UpdateCargoUserBody.role,
    );
  }

  //Deleta membro de uma company
  @UseGuards(JwtAuthGuard)
  @Delete('/:companyId/members/:memberId')
  async deleteMember(
    @Param('companyId') companyId: string,
    @Param('memberId') memberId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.DeleteMemberCompaniesRepositories.deleteMember(
      userId,
      companyId,
      memberId,
    );
  }

  //Lista companies do usuário
  @UseGuards(JwtAuthGuard)
  @Get()
  async getCompanies(@Req() req: any) {
    const userId = req.user.sub;
    return await this.GetUserCompaniesByUserRepositories.get(userId);
  }

  //Lista membros da company
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/members')
  async getCompaniesByUser(
    @Param('companyId') companyId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.GetUserCompaniesRepositories.getMembers(
      userId,
      companyId,
    );
  }

  //Deleta company
  @UseGuards(JwtAuthGuard)
  @Delete('/:companyId')
  async deleteCompany(@Param('companyId') companyId: string, @Req() req: any) {
    const userId = req.user.sub;
    return await this.DeleteCompanyRepository.deleteCompany(userId, companyId);
  }

  // Products routes

  // Cria produtos para a company
  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/inventory')
  async createProduct(
    @Param('companyId') companyId: string,
    @Req() req: any,
    @Body() body: CreateProductDto,
  ) {
    const userId = req.user.sub;
    return await this.CreateProductRepositories.createProduct(
      companyId,
      userId,
      body.name,
      body.description ?? null,
      body.productId,
      body.quantity,
      body.price,
      body.categoryId,
    );
  }

  // Atualiza produtos da company
  @UseGuards(JwtAuthGuard)
  @Patch('/:companyId/inventory/:productId')
  async updateProduct(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
    @Req() req: any,
    @Body() body: UpdateProductDto,
  ) {
    const userId = req.user.sub;
    return await this.UpdateProductRepositories.updateProduct(
      companyId,
      userId,
      productId,
      body.quantity,
      body.price,
    );
  }

  // Deleta produtos da company
  @UseGuards(JwtAuthGuard)
  @Delete('/:companyId/inventory/:productId')
  async deleteProduct(
    @Param('companyId') companyId: string,
    @Param('productId') productId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.DeleteProductRepositories.deleteProduct(
      companyId,
      userId,
      productId,
    );
  }

  // Listar produtos da company
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/inventory')
  async listProduct(@Param('companyId') companyId: string, @Req() req: any) {
    const userId = req.user.sub;
    return await this.ListProductRepositories.listProduct(companyId, userId);
  }

  // Invites routes

  // Cria convites para a company
  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/invites')
  async createInvite(@Param('companyId') companyId: string, @Req() req: any) {
    const userId = req.user.sub;
    return await this.CreateInvitesRepositories.createInvite(userId, companyId);
  }

  // Listar convites da company
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/invites')
  async lsitInvite(@Param('companyId') companyId: string, @Req() req: any) {
    const userId = req.user.sub;
    return await this.ListInvitesRepositories.listInvite(userId, companyId);
  }

  // Deletar convites da company
  @UseGuards(JwtAuthGuard)
  @Delete('/:companyId/invites/:inviteId')
  async deleteInvite(
    @Param('companyId') companyId: string,
    @Param('inviteId') inviteId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.DeleteInvitesRepositories.deleteInvite(
      userId,
      companyId,
      inviteId,
    );
  }

  // Categories routes

  // Cria categorias para a company
  @UseGuards(JwtAuthGuard)
  @Post('/:companyId/categories')
  async createCategory(
    @Param('companyId') companyId: string,
    @Body() body: CreateCategoryBody,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    const isOwner = await this.CreateCategoryRepositories.checkUserIsOwner(
      userId,
      companyId,
    );
    if (!isOwner) {
      throw new ForbiddenException(
        'Apenas o proprietário da empresa pode criar categorias.',
      );
    }
    const category = await this.CreateCategoryRepositories.create(
      companyId,
      body.name,
    );
    return category;
  }

  // Listar categorias da company
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/categories')
  async listManyCategories(
    @Param('companyId') companyId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.ListCategoryRepositories.listManyCategories(
      companyId,
      userId,
    );
  }

  // Listar categoria específica da company
  @UseGuards(JwtAuthGuard)
  @Get('/:companyId/categories/:categoryId')
  async listCategories(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.ListUniqueCategoryRepositories.listUniqueCategory(
      companyId,
      userId,
      categoryId,
    );
  }

  // Atualizar categoria específica da company
  @UseGuards(JwtAuthGuard)
  @Patch('/:companyId/categories/:categoryId')
  async updateCategory(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
    @Req() req: any,
    @Body() body: UpdateCategoryBody,
  ) {
    const userId = req.user.sub;
    return await this.UpdateCategoryRepositories.updateCategory(
      companyId,
      userId,
      categoryId,
      body.name,
    );
  }

  // Deletar categoria específica da company
  @UseGuards(JwtAuthGuard)
  @Delete('/:companyId/categories/:categoryId')
  async deleteCategory(
    @Param('companyId') companyId: string,
    @Param('categoryId') categoryId: string,
    @Req() req: any,
  ) {
    const userId = req.user.sub;
    return await this.DeleteCategoryRepositories.deleteCategory(
      companyId,
      userId,
      categoryId,
    );
  }
}

// entra em uma company (join invite)
@Controller('api/invites')
export class InvitesController {
  constructor(
    private joinInviteCompaniesRepositories: joinInviteCompaniesRepositories,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/join')
  async joinInvite(@Req() req: any, @Body() body: JoinInviteDto) {
    const userId = req.user.sub;
    return await this.joinInviteCompaniesRepositories.joinInvite(
      userId,
      body.inviteCode,
    );
  }
}
