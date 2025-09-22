import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/Database/prisma.service";
import { loginUserRepositories } from "../../users/login-user-repositories";
import * as bcrypt from "bcrypt";

@Injectable()
export class prismaLoginUserRepositories implements loginUserRepositories {
  constructor(private prisma: PrismaService) {}

  async login(email: string,password: string): Promise<any> {
    
    const user = await this.prisma.user.findUnique({
      where: { email }, select: { profile:{ select:{ firstName: true, lastName: true } }, id: true, email: true, password: true}
    });

    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return { id: user.id, email: user.email, firstName: user.profile?.firstName, lastName: user.profile?.lastName};
  }
}
