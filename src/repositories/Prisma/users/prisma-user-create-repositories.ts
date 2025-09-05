import { createUserRepositories } from "../../users/create-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"; // <<-- importa o bcrypt

@Injectable()
export class prismaUserRepositories implements createUserRepositories {
    constructor(private prisma: PrismaService) {}

    async create(firstName: string, lastName: string, email: string, password: string): Promise<any> {
        try {
            // gera o hash da senha antes de salvar
            const hashedPassword = await bcrypt.hash(password, 10);

            await this.prisma.user.create({    
                data: {
                    id: randomUUID(),
                    email,
                    password: hashedPassword, // <<-- salva o hash
                    profile: {
                        create: {
                            id: randomUUID(),
                            firstName,
                            lastName,
                        },
                    },
                },
            });

            return { message: "User registered successfully" };
        } catch (error) {
            if (error.code === "P2002") { 
                return { error: "User with this name already exists." };
            }
            throw new Error("An unexpected error occurred.");
        }
    }
}



// import { error } from "console";
// import { createUserRepositories } from "../../users/create-user-repositories";
// import { PrismaService } from "src/Database/prisma.service";
// import { randomUUID } from "crypto";
// import { Injectable } from "@nestjs/common";

// @Injectable()
// export class prismaUserRepositories implements createUserRepositories {
//     constructor(private prisma: PrismaService) {}

//     async create(firstName: string, lastName: string,email: string, password: string): Promise<any> {
//         try {
//             const user = await this.prisma.user.create({    
//                 data: {
//                     id: randomUUID(),
//                     email,
//                     password,
//                     profile: {
//                         create: {
//                             id: randomUUID(),
//                             firstName,
//                             lastName,
//                         },
//                     },
//                 },
//             });
//             return { message: "User registered successfully" };
//         } catch (error) {
//             if (error.code === "P2002") { 
//                 return { error: "User with this name already exists." };
//             }
//             throw new Error("An unexpected error occurred.");
//             }
//         }
//     }
