import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url, UrlSchema } from './url.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}
