import { BadRequestException, Injectable, UnprocessableEntityException, NotFoundException } from '@nestjs/common';
import { ShortenURLDto } from './url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';

@Injectable()
export class UrlService {

    async shortenUrl(url: ShortenURLDto) {
        const { longUrl, shortUrl: short } = url;

    //checks if longurl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    const urlCode = nanoid(10);
    const baseURL = 'http://localhost:3000';

    try {
      //check if the URL has already been shortened
      // let url = await this.repo.findOneBy({ longUrl });
      //return it if it exists
      if (url) return short;

      //if it doesn't exist, shorten it
      const shortUrl = `${baseURL}/${urlCode}`;

      //add the new record to the database
      /*url = this.repo.create({
        urlCode,
        longUrl,
        shortUrl,
      });*/

      // this.repo.save(url);
      return shortUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
    }

    async redirect(urlCode: string) {
        try {
          const url =  '' // await this.repo.findOneBy({ urlCode });
          if (url) return url;
        } catch (error) {
          console.log(error);
          throw new NotFoundException('Resource Not Found');
        }
      }

}
