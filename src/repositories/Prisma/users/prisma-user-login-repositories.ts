import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/Database/prisma.service";
import { loginUserRepositories } from "../../users/login-user-repositories";
import * as bcrypt from "bcrypt";

@Injectable()
export class prismaLoginUserRepositories implements loginUserRepositories {
  constructor(private prisma: PrismaService) {}

  async login(
    email: string,
    password: string
  ): Promise<{ id: string; email: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { id: user.id, email: user.email };
  }
}
