import { NextFunction, Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import Genre from '../models/GenreModel';

const genreRouter = Router();

genreRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Genre.find();

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

genreRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  try {
    const genre = new Genre({
      name: name
    });

    const newGenre = await genre.save();

    return res.send({ message: 'Created', newGenre });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    next(error);
  }
});

export default genreRouter;
