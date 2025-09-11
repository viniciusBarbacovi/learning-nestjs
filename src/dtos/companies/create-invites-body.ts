// src/dtos/invites/create-invite.dto.ts
import { IsEmail, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { Role } from "@prisma/client";

export class CreateInviteDto {
  @IsEmail()
  email: string;

  @IsUUID()
  companyId: string;

  @IsEnum(Role, { message: "Role deve ser OWNER ou EMPLOYEE" })
  role: Role;
}
