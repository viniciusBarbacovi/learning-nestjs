import { error } from "console";
import { createUserRepositories } from "../../users/create-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserRepositories implements createUserRepositories {
    constructor(private prisma: PrismaService) {}

    async create(name: string, description: string): Promise<any> {
        try {
            const user = await this.prisma.user.create({
                data: {
                    id: randomUUID(),
                    name,
                    description,
                },
            });
            return { name: user.name, description: user.description };
        } catch (error) {
            if (error.code === "P2002") { 
                return { error: "User with this name already exists." };
            }
            throw new Error("An unexpected error occurred.");
            }
        }
    }
