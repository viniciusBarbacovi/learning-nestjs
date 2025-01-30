import { IsNotEmpty, Length } from "class-validator";


export class createStudentBody {
	@IsNotEmpty({           
		message: 'Name cannot be empty'
	})
	@Length(5, 100)
	class_id: string
}