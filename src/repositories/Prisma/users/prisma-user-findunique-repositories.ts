import { findUniqueUserRepositories } from "../../users/findunique-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaFindUniqueUserRepositories implements findUniqueUserRepositories {
	constructor(private prisma: PrismaService) {}

	async findUnique(id_user: string): Promise<any> {
		try {
			const user = await this.prisma.user.findUnique({
				where: {
					id: id_user,
				},
			});
			return { message: `User ${user?.name} finded successfully.` };
		} catch (error) {
			if (error.code === "P2025") {  // Código de erro do Prisma para registros não encontrados
				return { error: "This user doesn't exist." };
			}
			throw new Error("An unexpected error occurred.");
		}
	}
}