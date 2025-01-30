import { updateStudentRepositories } from "../../students/update-student-repositories"
import { PrismaService } from "src/Database/prisma.service";
import { Injectable, NotFoundException  } from "@nestjs/common";

@Injectable()
export class prismaStudentUpdateRepositories implements updateStudentRepositories  {
	constructor(private prisma: PrismaService) {}

	async update(id: string, class_id: string, student_id: string): Promise<any> {

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
			const user = await this.prisma.student.update({
				where: {
					id: id,
				}, data: {
					class_id,
					student_id
				}
			});
			return { message: `Student ${findStudent.student.name} uptaded successfully.` };
		} catch (error) {
			if (error.code === "P2025") {  
				throw new NotFoundException("This student doesn't exist.");
			}
		
			throw new Error(`An unexpected error occurred: ${error.message}`);
		}
	}
}