import { NextFunction, Request, Response, Router } from 'express';
import { imagesUpload } from '../multer';
import BookModel from '../models/bookModel';
import mongoose from 'mongoose';

const bookRouter = Router();

bookRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await BookModel.find()
    .populate('author', '_id name image biography date_of_birth')
    .populate('genre', '_id name');

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

bookRouter.post('/', imagesUpload.single('image'), async (req: Request, res: Response, next: NextFunction) => {
  const { name, description, author, date, genre, bookCount } = req.body;
  const bookImage = req.file;

  try {
    const bookData = new BookModel({
      name: name,
      description: description,
      image: bookImage ? bookImage.filename : null,
      author: author,
      date: date,
      genre: genre,
      bookCount: bookCount,
    });

    const newBook = await bookData.save();

    return res.send({ message: 'Created', newBook });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(422).send(error);
    }

    next(error);
  }
});

export default bookRouter;
