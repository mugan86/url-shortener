import { UrlService } from './url.service';
import { PaginationParams, ShortenURLDto } from './url.dto';
import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';

@Controller('url')
export class UrlController {
  constructor(private service: UrlService) {}

  @Get('list')
  async getAll(@Query() { page, items }: PaginationParams) {
    return await this.service.findAll(page, items);
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
