import {IsString, IsNotEmpty } from 'class-validator';

export class createCompaniesBody {
  @IsNotEmpty()
  @IsString() 
  name: string;
}