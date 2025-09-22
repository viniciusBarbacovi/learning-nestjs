import { IsNotEmpty, IsString } from 'class-validator';
export class UpdateCategoryBody {
  @IsString()
  @IsNotEmpty()
  name: string;
}
