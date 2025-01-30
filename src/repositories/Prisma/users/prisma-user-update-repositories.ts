import { updateUserRepositories } from "../../users/update-user-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable, NotFoundException  } from "@nestjs/common";

@Injectable()
export class prismaUserUpdateRepositories implements updateUserRepositories  {
	constructor(private prisma: PrismaService) {}

	async update(id_user: string,name: string, email: string): Promise<any> {

		const findUser = await this.prisma.user.findUnique({
			where:{
				id: id_user
			}
		})

		if (!findUser){
			throw new NotFoundException("User not found.");
		}

		try {
			const user = await this.prisma.user.update({
				where: {
					id: id_user,
				}, data: {
					name,
					email
				}
			});
			return { message: `User ${user.name} uptaded successfully.` };
		} catch (error) {
			if (error.code === "P2025") {  
				throw new NotFoundException("This user doesn't exist.");
			}
		
			throw new Error(`An unexpected error occurred: ${error.message}`);
		}
	}
}