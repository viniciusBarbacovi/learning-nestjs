import { IsNotEmpty } from "class-validator";

export class updateStudentBody {

	@IsNotEmpty()
	class_id: string;

	student_id: string;
}