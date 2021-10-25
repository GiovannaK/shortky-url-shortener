import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { URLSchema } from './entity/url.entity';
import { ShortenController } from './shorten.controller';
import { ShortenService } from './shorten.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'URL', schema: URLSchema }])],
  controllers: [ShortenController],
  providers: [ShortenService],
})
export class ShortenModule {}
