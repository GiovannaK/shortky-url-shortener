import { IsString } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  originURL: string;
}
