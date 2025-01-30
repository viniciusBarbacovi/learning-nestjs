import { getStudentsRepositories } from "../../students/get-students-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaStudentsGetRepositories implements getStudentsRepositories {
	constructor(private prisma: PrismaService) {}

	async findMany(): Promise<any> {
		return await this.prisma.student.findMany({  
			include:{
				student:{
					select:{
						name: true,
						role: true,
						email: true
					}
				}
			},
			omit:{
				id: true,
				student_id: true,
			},
		});
	}
}
