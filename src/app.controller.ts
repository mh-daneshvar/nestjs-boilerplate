import {
  Controller,
  Get,
  CacheInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerResponse } from './common/response-decorator/responses.interface';
import { configService } from './config.service';

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

  @Get('/health-check')
  public async healthCheck(): Promise<ControllerResponse> {
    const serviceName = configService.get<string>('SERVICE_NAME');
    return {
      message: `${serviceName} is healthy`,
      data: {
        status: 'ok',
      },
    };
  }
}
