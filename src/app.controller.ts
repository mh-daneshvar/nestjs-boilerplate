import {
  Controller,
  Get,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerResponse } from './common/response-decorator/responses.interface';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @UseInterceptors(CacheInterceptor)
  public async getHello(): Promise<ControllerResponse> {
    return {
      data: {
        hello: await this.appService.getHello(),
      },
    };
  }
}
