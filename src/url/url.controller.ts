import { UrlService } from './url.service';
import { ShortenURLDto } from './url.dto';
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';

@Controller('url')
export class UrlController {
  constructor(private service: UrlService) {}

  @Get('list')
  async getAll() {
    return await this.service.findAll();
  }

  @Get(':code')
  async redirect(
    @Res() res,
    @Param('code')
    code: string
  ) {
    const url = await this.service.redirect(code);
    return res.redirect(`${url.longUrl}`);
  }

  @Post('shorten')
  shortenUrl(
    @Body()
    url: ShortenURLDto
  ) {
    return this.service.shortenUrl(url);
  }
}
