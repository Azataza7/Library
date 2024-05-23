import { NextFunction, Request, Response, Router } from "express";
import Author from "../models/AuthorModel";
import { profileUpload } from "../multer";
import mongoose from "mongoose";

const authorRouter = Router();

authorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results = await Author.find();

    return res.send(results);
  } catch (error) {
    next(error);
  }
});

authorRouter.post('/', profileUpload.single('avatar'), 
async(req: Request, res: Response, next: NextFunction) => {
  const { name, biography, date_of_birth } = req.body;
  const profileImage = req.file;

  try {
    const author = new Author({
      name: name,
      biography: biography,
      date_of_birth: date_of_birth,
      image: profileImage?.filename
    });

    const newAuthor = await author.save();

    return res.send({ message: 'Created', newAuthor });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(error);
    }

    next(error);
  }
});

export default authorRouter;
