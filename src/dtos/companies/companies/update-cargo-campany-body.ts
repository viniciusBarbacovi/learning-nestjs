import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateCargoUserDto {
  @IsNotEmpty({ message: 'O campo email não pode estar vazio' })
  @IsEnum(Role, { message: 'Role deve ser OWNER ou EMPLOYEE' })
  role: Role;
}
