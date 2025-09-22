import { IsNotEmpty, IsString } from 'class-validator';
export class CreateCategoryBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}
