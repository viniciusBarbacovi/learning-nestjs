import { deleteUserRepositories } from "../../users/delete-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaUserDeleteRepositories implements deleteUserRepositories {
    constructor(private prisma: PrismaService) {}

    async delete(id_user: string): Promise<any> {
        try {
            const user = await this.prisma.user.delete({
                where: {
                    id: id_user,
                },
            });
            return { message: `User ${user.name} deleted successfully.` };
        } catch (error) {
            if (error.code === "P2025") {  // Código de erro do Prisma para registros não encontrados
                return { error: "This user doesn't exist." };
            }
            throw new Error("An unexpected error occurred.");
        }
    }
}