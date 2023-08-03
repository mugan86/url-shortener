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
  constructor(@InjectModel(Url.name) private urlModel: Model<UrlDocument>) { }

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

  private async pagination(
    model: Model<unknown>,
    page: number = 1,
    itemsPage: number = 20,
    filter: object = {}
  ) {
    // Check items per page
    if (itemsPage < 1 || itemsPage > 20) {
      itemsPage = 20;
    }
    if (page < 1) {
      page = 1;
    }
    const total = await model.count();
    const pages = Math.ceil(total / itemsPage);
    return {
      skip: (page - 1) * itemsPage,
      itemsPage,
      total,
      pages: {
        total: pages,
        current: page
      }
    };
  }

  async findAll(page = 1, itemsPerPage?: number) {
    const pageOptions = await this.pagination(this.urlModel, page, itemsPerPage || 20);

    return {
      pagination: pageOptions, results: await this.urlModel
        .find()
        .sort({ _id: 1 })
        .skip(pageOptions.skip).limit(itemsPerPage)
    };

  }
}

