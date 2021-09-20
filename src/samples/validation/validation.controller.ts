import { Body, Controller, Post } from '@nestjs/common';
import { AddStudentDto } from './add-student.dto';

@Controller('samples/validation')
export class ValidationController {
  @Post()
  public async checkValidation(@Body() addStudentDto: AddStudentDto) {
    return {
      data: addStudentDto,
    };
  }
}
