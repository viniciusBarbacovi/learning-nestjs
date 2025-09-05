import { IsEmail, IsString} from 'class-validator';

export class loginMemberBody {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}