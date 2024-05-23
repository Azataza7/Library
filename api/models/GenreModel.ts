import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Genre = mongoose.model('genre', GenreSchema);
export default Genre;