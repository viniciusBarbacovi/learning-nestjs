import { IsNotEmpty, Length } from "class-validator";

export class deleteMemberBody {
	@IsNotEmpty()
	id: string;
}