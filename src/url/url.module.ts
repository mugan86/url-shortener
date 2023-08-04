import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { Url, UrlSchema } from './url.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from 'src/app.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),],
  providers: [UrlService, AppService],
  controllers: [UrlController]
})
export class UrlModule {}
