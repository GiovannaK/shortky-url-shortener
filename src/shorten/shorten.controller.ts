import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUrlDto } from './dto/create-url.dto';
import { ShortenService } from './shorten.service';

@Controller('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    return await this.shortenService.shortenUrl(createUrlDto);
  }

  @Get(':hash')
  async redirect(@Param('hash') hash: string, @Res() response: Response) {
    return await this.shortenService.redirect(hash, response);
  }
}
