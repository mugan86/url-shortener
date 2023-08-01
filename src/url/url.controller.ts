import { UrlService } from './url.service';
import { ShortenURLDto } from './url.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

@Controller('url')
export class UrlController {
    constructor(private service: UrlService) {}

    @Post('shorten')
    shortenUrl(
      @Body()
      url: ShortenURLDto,
    ) {
      return this.service.shortenUrl(url);
    }
}
