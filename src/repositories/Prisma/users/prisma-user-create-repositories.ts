import { error } from "console";
import { createUserRepositories } from "../../users/create-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserRepositories implements createUserRepositories {
    constructor(private prisma: PrismaService) {}

    async create(name: string, email: string): Promise<any> {
        try {
            const user = await this.prisma.user.create({    
                data: {
                    id: randomUUID(),
                    name,
                    email,
                },
            });
            return { name: user.name, email: user.email };
        } catch (error) {
            if (error.code === "P2002") { 
                return { error: "User with this name already exists." };
            }
            throw new Error("An unexpected error occurred.");
            }
        }
    }
