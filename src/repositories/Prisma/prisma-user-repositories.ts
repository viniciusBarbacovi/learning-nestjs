import { error } from "console";
import { createUserRepositories } from "../user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserRepositories implements createUserRepositories {

    constructor(private prisma: PrismaService) { }

    async create(name: string, description: string): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: randomUUID(),
                name,
                description
            }
        })
    }
}