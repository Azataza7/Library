import mongoose, { Schema, Types } from "mongoose";
import Author from "./AuthorModel";
import Genre from "./GenreModel";

const BookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'author',
    validate: {
      validator: async (value: Types.ObjectId) => await Author.findById(value),
      message: 'Author not found!',
    },
    default: ['Anonymous']
  },
  date: { type: Date }, 
  image: { type: String },
  genre: {
    type: Schema.Types.ObjectId,
    ref: 'genre',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => await Genre.findById(value),
      message: 'Genre not found!',
    }
  },
  bookCount: { type: Number, required: true }
})

const BookModel = mongoose.model('Book', BookSchema);
export default BookModel;