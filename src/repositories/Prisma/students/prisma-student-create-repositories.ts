import { error } from "console";
import { createStudentRepositories } from "../../students/create-student-repositories";
import { PrismaService } from "src/Database/prisma.service";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaStudentRepositories implements createStudentRepositories {
	constructor(private prisma: PrismaService) {}

	async create(student_id: string, class_id: string): Promise<any> {
		try {
			const student = await this.prisma.student.create({    
				data: {
					id: randomUUID(),
					student_id,
					class_id
				},
			});
			return { class_id: student.class_id };
		} catch (error) {
			if (error.code === "P2002") { 
				return { error: "The student cannot be in two classes at the same time" };
			}
			throw new Error("An unexpected error occurred.");
			}
		}
	}
