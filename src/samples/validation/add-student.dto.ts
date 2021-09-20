import { IsEmail, IsString } from 'class-validator';

export class AddStudentDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;
}
