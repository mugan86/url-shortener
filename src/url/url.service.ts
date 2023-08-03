import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShortenURLDto } from './url.dto';
import { nanoid } from 'nanoid';
import { isURL } from 'class-validator';
import { Url, UrlDocument } from './url.schema';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) {}

  async shortenUrl(url: ShortenURLDto) {
    const { longUrl, title, description } = url;

    // checks if longurl is a valid URL
    if (!isURL(longUrl)) {
      throw new BadRequestException('String Must be a Valid URL');
    }

    const urlCode = nanoid(10);

    try {
      // Check if the longUrl already exists in the database
      let existingUrl = await this.urlModel.findOne({ longUrl });

      // Return existing URL if it already exists
      if (existingUrl) return existingUrl;

      // Create and save the new URL record in the database
      const newUrl = new this.urlModel({ longUrl, urlCode, title, description });
      const savedUrl = await newUrl.save();

      return savedUrl;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException('Server Error');
    }
  }

  async redirect(urlCode: string) {
    try {
      const existingUrl = await this.urlModel.findOne({ urlCode });
      if (existingUrl) return existingUrl;
      throw new NotFoundException('Resource Not Found');
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Resource Not Found');
    }
  }
}
