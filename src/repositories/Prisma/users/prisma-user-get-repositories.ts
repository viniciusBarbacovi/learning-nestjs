import { getUserRepositories } from "../../users/get-users-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserGetRepositories implements getUserRepositories {
    constructor(private prisma: PrismaService) {}

    async findMany(): Promise<any> {
        return await this.prisma.user.findMany({});
    }
}
