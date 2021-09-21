import { Controller } from '@nestjs/common';
import { MongoService } from './mongo.service';

@Controller('samples/mongo')
export class MongoController {
  constructor(private readonly mongoService: MongoService) {}
}
