import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUrlDto } from './dto/create-url.dto';
import { ShortenService } from './shorten.service';

@Controller('shorten')
@ApiTags('shorten')
export class ShortenController {
  constructor(private readonly shortenService: ShortenService) {}

  @Post()
  @ApiOperation({
    summary: 'Receive a originURL, store on database and return ShortURL',
  })
  async shortenUrl(@Body() createUrlDto: CreateUrlDto) {
    return await this.shortenService.shortenUrl(createUrlDto);
  }

  @Get(':hash')
  @ApiOperation({
    summary:
      'Receive a hash param, check if param exist on database and redirect to link',
  })
  async redirect(@Param('hash') hash: string, @Res() response: Response) {
    return await this.shortenService.redirect(hash, response);
  }
}
