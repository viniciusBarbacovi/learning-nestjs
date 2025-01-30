import { deleteStudentRepositories } from "../../students/delete-student-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class prismaStudentDeleteRepositories implements deleteStudentRepositories {
	constructor(private prisma: PrismaService) {}

	async delete(id: string): Promise<any> {

		const findStudent = await this.prisma.student.findUnique({
			where:{
				id: id
			},
			include:{
				student:{
					select:{
						name:true
					}
				}
			}
		})

	if (!findStudent){
		throw new NotFoundException("Student not found.");
	}

		try {
			const student = await this.prisma.student.delete({
				where: {
					id: id,
				},
			});
			return { message: `Student ${findStudent.student.name} deleted successfully.` };
		} catch (error) {
			if (error.code === "P2025") {  // Código de erro do Prisma para registros não encontrados
				return { error: "This student doesn't exist." };
			}
			throw new Error("An unexpected error occurred.");
		}
	}
}