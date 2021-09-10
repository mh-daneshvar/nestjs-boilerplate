import {
  CacheInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerResponse } from '@common/interceptors/response-decorator/responses.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  async getHello(): Promise<ControllerResponse> {
    return {
      data: {
        hello: await this.appService.getHello(),
      },
    };
  }
}
