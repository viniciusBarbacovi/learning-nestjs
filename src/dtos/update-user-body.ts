import { IsNotEmpty, Length } from "class-validator";

export class updateMemberBody {

	@Length(5, 100)
	name: string;

	email: string;
}