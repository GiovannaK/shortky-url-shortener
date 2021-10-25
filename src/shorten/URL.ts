import { Document } from 'mongoose';

export class URL extends Document {
  hash: string;

  originURL: string;

  shortURL: string;
}
