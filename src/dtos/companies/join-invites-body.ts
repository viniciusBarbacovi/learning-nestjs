import { IsNotEmpty, IsString } from 'class-validator';

export class JoinInviteDto {
  @IsString()
  @IsNotEmpty()
  inviteCode: string;
}
