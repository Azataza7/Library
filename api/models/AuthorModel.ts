import mongoose, { Schema } from "mongoose";

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  biography: {
    type: String,
  },
  date_of_birth: {
    type: String,
    required: true
  }
});

const Author = mongoose.model('author', AuthorModel);

export default Author;