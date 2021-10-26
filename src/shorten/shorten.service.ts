/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Response } from 'express';
import { Model } from 'mongoose';
const shortid = require('shortid');
import { CreateUrlDto } from './dto/create-url.dto';
import { URL } from './URL';

@Injectable()
export class ShortenService {
  constructor(
    @InjectModel('URL')
    private readonly URLModel: Model<URL>,
  ) {}

  async shortenUrl(createUrlDto: CreateUrlDto) {
    const url = await this.URLModel.findOne({
      originURL: createUrlDto.originURL,
    });

    if (url) {
      return url;
    }
    const hash = shortid.generate();
    const shortURL = `${process.env.API_URL}/shorten/${hash}`;
    const createdURL = await this.URLModel.create({
      hash,
      shortURL,
      originURL: createUrlDto.originURL,
    });

    if (!createdURL) {
      throw new InternalServerErrorException('Cannot create url');
    }
    return createdURL;
  }

  async redirect(hash: string, response: Response) {
    const url = await this.URLModel.findOne({ hash });

    if (!url) {
      throw new NotFoundException('Cannot found originURL');
    }

    return response.redirect(url.originURL);
  }
}
