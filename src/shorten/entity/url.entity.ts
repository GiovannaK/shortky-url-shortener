import * as mongoose from 'mongoose';

export const URLSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },

  originURL: {
    type: String,
    required: true,
  },

  shortURL: {
    type: String,
    required: true,
  },
});
