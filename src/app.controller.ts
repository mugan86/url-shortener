import { AppService } from './app.service';
import {Controller, Get, Req} from '@nestjs/common';
import {Request} from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/current-path')
    current(@Req() req: Request): void {
        console.log(req.originalUrl)
        console.log(`${req.protocol}://${req.get('Host')}${req.originalUrl}`);
    }
}
